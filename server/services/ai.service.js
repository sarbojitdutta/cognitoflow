import Groq from "groq-sdk";
import path from "path";
import { generateFileTree } from "../utils/generateFileTree.util.js"; 

let groq = null;
const getGroqClient = () =>{
    if(!groq){
        if(!process.env.GROQ_API_KEY){
            throw new Error("GROQ_API_KEY is not set in environment variables")
        }
        groq = new Groq({
            apikey: process.env.GROQ_API_KEY
        })
    }
    return groq
}

// System prompt for code review instructions
const MANUAL_SYSTEM_PROMPT = 
`You are an expert senior software engineer.  
Your task is to take the user’s code and produce a line-by-line improved version of it.

RULES:

1. AUTO-DETECT the programming language.
2. Rewrite and improve the code while keeping the same functionality.
3. For every modification:
   - Show the ORIGINAL line starting with "- "
   - Show the IMPROVED line starting with "+ "
4. If a line does not need changes, you may include only the improved line (no prefix).
5. Do NOT wrap outputs in Markdown or code fences.
6. Do NOT return JSON. The output must be plain text.

THE OUTPUT FORMAT MUST BE EXACTLY LIKE THIS:

- original line 1
+ improved line 1

- original line 2
+ improved line 2

unchanged or improved lines continue normally...

<blank line>

Summary of Improvements:
✔ Short bullet-points describing all enhancements you made.

ADDITIONAL RULES:
- Fix bad formatting, indentation, naming, and code structure.
- Convert outdated patterns to modern best practices (e.g., callbacks → async/await).
- Optimize performance if possible.
- Improve readability and remove redundancies.
- Add missing error handling when appropriate.
- Do NOT change the code's functionality.

THE FINAL OUTPUT MUST CONTAIN:
1. The full line-by-line improved code with -/+ indicators
2. A review summary at the bottom
3. No extra text, no explanation outside the specified format.

`;
const projectRoot = path.resolve(process.cwd(), '../')
const fileStructure = generateFileTree(projectRoot)

const PR_SYSTEM_PROMPT = `
You are an expert Senior Software Engineer reviewing a Pull Request.
You will receive a collection of file patches (diffs).

Here is the overall file structure of the project:
${fileStructure}

YOUR TASKS:
1. Analyze the changes for:
   - 🐛 Potential Bugs or Logic Errors
   - 🔒 Security Vulnerabilities (e.g., injection, secrets, weak auth)
   - ⚡ Performance Bottlenecks
   - 🧹 Code Cleanliness & Best Practices
2. Do NOT rewrite the code line-by-line. Instead, provide a structured review.
3. Be constructive and specific.

OUTPUT FORMAT (Markdown):
## 📝 Code Review
### 🛑 Critical Issues (if any)
- ...

### ⚠️ Improvements & Suggestions
- ...

### ✅ Good Practices Detected
- ...

### 🏁 Final Verdict
(Approve / Request Changes)
`;

// Configuration for Groq API requests
const GROQ_CONFIG = {
    model: "qwen/qwen3-32b",
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
    stream: false
};

const generateReview = async (code, contextType="manual") => {
    // Check for API key
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not set in environment variables");
    }
    const SYSTEM_PROMPT = contextType === "pr" ? PR_SYSTEM_PROMPT : MANUAL_SYSTEM_PROMPT
    const userMessage = contextType == "pr" 
    ? `Here are the file changes(diff) for this PR:\n\n${code}`
    : `Review this code:\n\n${code}`

    try {
        const client = getGroqClient()

        // Make API request to Groq
        const completion = await client.chat.completions.create({
            ...GROQ_CONFIG,
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `Review this code:\n\n${code}`
                }
            ]
        });

        // Extract and validate response
        const review = completion.choices[0]?.message?.content;

        if (!review) {
            throw new Error("No review content received from API");
        }

        console.log("✅ Code review generated successfully");
        return review;

    } catch (error) {
        // Enhanced error logging
        console.error("⚠️ Error while generating code review:", error.message);
        
        // Log additional error details if available
        if (error.response) {
            console.error("API Response Error:", error.response.data);
        }
        
        if (error.status) {
            console.error("Status Code:", error.status);
        }

        // Throw a more descriptive error
        throw new Error(`Failed to generate code review: ${error.message}`);
    }
};

export default generateReview;