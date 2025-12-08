import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Prism from "prismjs";
import hljs from "highlight.js/lib/common";

import "prismjs/themes/prism-tomorrow.css"; // prism dark theme
import "highlight.js/styles/github-dark.css"; // hljs theme (used only for detection)

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-typescript";

function Codereview() {
    const [code, setCode] = useState("")
    const [review, setReview] = useState("No review yet...")
    const [highlighted, setHighlighted] = useState("")
    const [detectedLang, setDetectedLang] = useState("javascript")

    useEffect(() => {
        if(!code.trim()){
            setHighlighted("")
            return
        }
        const result = hljs.highlightAuto(code)
        setDetectedLang(result.language || "javascript")

        const prismLang = Prism.languages[result.language ] || Prism.languages.javascript
        setHighlighted(Prism.highlight(code, prismLang, result.language))
    },[code])

    async function handleReview() {
        try {
            if (!code.trim) {
                alert("Please enter some code to review.")
                return
            }
            const response = await axios.post("http://localhost:3000/api/code/review", { code: code })
            response.then((res) => {
                setReview(res.data.review)
            })
        }catch(error){
            console.error("Error during code review:", error)
            alert("An error occurred while reviewing the code. Please try again.")
        }
    }
    return (
        <div className="bg-[#0B0B0F] w-full h-screen p-10">
            <div className="max-w-6xl">
                <h1 className="text-white text-3xl font-bold">Code Reviewer</h1>
                <p className="text-gray-400 mt-2">AI-Powered Code Review and Collaboration</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* left side */}
                <div className="bg-[#1a1a1d] p-6 rounded-xl border border-gray-800 shadow-lg h-[450px] flex flex-col">
                    
                    <div className="flex-grow rounded-lg overflow-hidden">
                        <Editor
                            height="100%"
                            defaultLanguage={detectedLang}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value)}
                        />
                    </div>
                    <button onClick={handleReview} className="bg-purple-600 hover:bg-purple-700 text-white w-full mt-4 px-4 py-2 rounded-lg">
                        Review Code
                    </button>
                </div>

                {/* right side */}
                <div className="bg-[#1a1a1d] p-6 rounded-xl border border-gray-800 shadow-lg h-[450px]">
                    <h2 className="text-xl font-semibold mb-4 text-white">Reviews</h2>
                    <p className="text-gray-300 whitespace-pre-wrap">{review}</p>
                </div>
            </div>
            <div></div>
        </div>
    )
}
export default Codereview  