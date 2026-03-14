import express from 'express'
import dotenv from 'dotenv'
import { Octokit } from '@octokit/rest'
import { createAppAuth } from '@octokit/auth-app'
import Review from '../models/review.js'
import generateReview from '../services/ai.service.js'
import User from '../models/userModel.js'

const router = express.Router()
dotenv.config()

const privateKey = process.env.GITHUB_PRIVATE_KEY_PATH.replace(/\\n/g, '\n');

router.post("/github-webhook", async (req, res) => {
    const event = req.headers['x-github-event']
    const payload = req.body

    if (!event || !payload) {
        return res.status(400).send('Invalid request');
    }
    console.log(`Received GitHub event: ${event}`)

    if (event === 'pull_request') {
        const action = payload.action
        const repoOwner = payload.repository.owner.login
        const repoName = payload.repository.name
        const prNumber = payload.number
        const prTitle = payload.pull_request.title

        const installationId = payload.installation.id;

        const octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId: process.env.GITHUB_APP_ID,
                privateKey: privateKey,
                installationId: installationId,
            }
        })

        console.log(`Pull Request #${prNumber} in ${repoName} - Action: ${action}, Title: ${prTitle}`)

        if (action === 'opened' || action === 'synchronize') {
            console.log("   --> Triggering AI Review...")

            //logic to trigger AI review
            try {
                const { data: files } = await octokit.pulls.listFiles({
                    repo: repoName,
                    pull_number: prNumber,
                    owner: repoOwner,
                })

                const fileChanges = files.map(file => {
                    return {
                        filename: file.filename,
                        patch: file.patch || "No text changes (binary file or too large)"
                    }
                })
                console.log(`successfully fetched ${fileChanges.length} changed files`)

                const aiReviewText = await generateReview(fileChanges)
                const prAuthorName = payload.pull_request.user.login
                const registeredUser = await User.findOne({ githubUsername: prAuthorName })
                let gamifiedFooter = ""
                const reviewuserId = registeredUser._id

                if (registeredUser) {
                    console.log("   --> PR author is a registered user. Adding gamification elements to the review.")
                    let xpEarned = 20;
                    const additions = payload.pull_request.additions || 0
                    xpEarned += Math.floor(additions / 10)

                    let isFlawless = false;
                    const bugFound = aiReviewText.bugFound || 0;

                    if (bugFound === 0) {
                        xpEarned += 50
                        isFlawless = true;
                    } else {
                        xpEarned -= (bugFound * 5)
                        xpEarned = Math.max(xpEarned, 0)
                    }
                    const newTotalXp = (registeredUser.xp || 0) + xpEarned;
                    const newLevel = Math.floor(newTotalXp / 100) + 1;

                    await User.findByIdAndUpdate(registeredUser._id, {
                        xp: newTotalXp,
                        level: newLevel,
                        $inc: { flawlessReviews: isFlawless ? 1 : 0 }
                    })
                    gamifiedFooter = `\n\n---\n🎉 **Gamification Update**: You've earned ${xpEarned} XP for this PR review! Your new total is ${newTotalXp} XP (Level ${newLevel}). Keep up the great work!`
                }

                if (reviewuserId) {
                    const aiReview = new Review({
                        userId: payload.sender.id,
                        repoOwner: `${repoOwner}`,
                        repoName: `${repoName}`,
                        prNumber: prNumber,
                        prTitle: prTitle,
                        filesChanged: fileChanges.map(f => f.filename),
                        bugFound: aiReviewText.bugFound,
                        additions: payload.pull_request.additions,
                        deletions: payload.pull_request.deletions,
                        aiReview: aiReviewText
                    })
                    await aiReview.save()
                    console.log("   --> AI Review saved to database.")
                }

                const frontendUrl = 'http://localhost:5173'
                const dashboardLink = `${frontendUrl}/reviews/${repoOwner}/${repoName}/${prNumber}`
                const finalComment = `## 🤖 CognitoFlow Review\n\n${aiReviewText.reviewComments}${gamifiedFooter}\n\n---\n[📊 View Detailed Report](${dashboardLink})`

                await octokit.issues.createComment({
                    owner: repoOwner,
                    repo: repoName,
                    issue_number: prNumber,
                    body: finalComment
                });

                if (fileChanges.length > 0) {
                    console.log(`\n--- Diff for ${fileChanges[0].filename} ---`)
                    console.log(fileChanges[0].patch)
                    console.log('-------------------------------------------\n')
                }



            } catch (error) {
                console.error("Error fetching files from GitHub:", error.message)
            }
        }

    }
    res.status(200).send('Webhook recieved')

})
export default router