import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
function Codereview() {
    const [code, setCode] = useState("")
    const [review, setReview] = useState("No review yet...")

    function handleReview() {
        try {
            if (!code.trim) {
                alert("Please enter some code to review.")
                return
            }
            const response = axios.post("http://localhost:3000/api/code/review", { code: code })
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
                            language="Plaintext"
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
                    <h2 className="text-xl font-semibold mb-4">Reviews</h2>

                    <div className="bg-[#2a2a2d] h-full p-4 rounded-lg overflow-auto whitespace-pre-wrap text-gray-300">
                        {review}
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}
export default Codereview  