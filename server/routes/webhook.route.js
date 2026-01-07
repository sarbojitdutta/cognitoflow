import express from 'express'
import dotenv from 'dotenv'
import  {Octokit}  from '@octokit/rest'
import Review from '../models/review.js'
import  generateReview  from '../services/ai.service.js'

const router = express.Router()

dotenv.config()

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

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

                const aiReview = new Review({
                    repoName: `${repoName}/${repoOwner}`,
                    prNumber: prNumber,
                    prTitle: prTitle,
                    filesChanged: fileChanges.map(f => f.filename),
                    aiReview: aiReviewText
                })
                await aiReview.save()
                console.log("   --> AI Review saved to database.")

                await octokit.issues.createComment({
                    owner: repoOwner,
                    repo: repoName,
                    issue_number: prNumber,
                    body: `## 🤖 CognitoFlow Review\n\n${aiReviewText}`
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