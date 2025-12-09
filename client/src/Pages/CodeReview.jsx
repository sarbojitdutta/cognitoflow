import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Prism from "prismjs";
import hljs from "highlight.js/lib/common";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-typescript";

function Codereview() {
    const [code, setCode] = useState("");
    const [review, setReview] = useState("No review yet...");
    const [highlighted, setHighlighted] = useState("");
    const [detectedLang, setDetectedLang] = useState("javascript");

    /* Auto-detect */
    useEffect(() => {
        if (!code.trim()) {
            setDetectedLang("javascript");
            return;
        }

        const result = hljs.highlightAuto(code);
        setDetectedLang(result.language || "javascript");
    }, [code]);

    /* Handle review API */
    async function handleReview() {
        try {
            if (!code.trim()) return alert("Please enter some code.");

            const res = await axios.post("http://localhost:3000/api/code/review", { code });

            setReview(res.data.review);

            const prismLang = Prism.languages[detectedLang] || Prism.languages.javascript;
            setHighlighted(
                Prism.highlight(res.data.review, prismLang, detectedLang)
            );
        } catch (error) {
            console.error(error);
            alert("Error reviewing code.");
        }
    }

    return (
        <div className="bg-[#0B0B0F] w-full h-screen p-4">
            <div className="w-full h-full border border-gray-800 rounded-xl overflow-hidden">

                {/* RESIZABLE PANELS LIKE VS CODE */}
                <PanelGroup direction="horizontal">

                    {/* LEFT PANEL */}
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0B0B0F] p-4 flex flex-col">
                            {/* BUTTON */}
                            <div className="flex flex-column gap-8 ml-36">
                                <button onClick={() => {
                                    setCode("")
                                    setReview("No review yet...")
                                    setHighlighted("")
                                }} className="bg-zinc-800 border-white hover:bg-zinc-700 text-white w-22 mb-2 px-2 py-2 rounded-lg cursor-pointer transition-colors duration-300">
                                    Reset
                                </button>
                                <button
                                    onClick={handleReview}
                                    className="bg-purple-600 hover:bg-purple-700 text-white w-22 mb-2 px-2 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                                >
                                    Review
                                </button>

                            </div>

                            {/* MONACO EDITOR */}
                            <div className="flex-grow rounded-lg overflow-hidden">
                                <Editor
                                    height="100%"
                                    theme="vs-dark"
                                    defaultLanguage={detectedLang}
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                />
                            </div>


                        </div>
                    </Panel>

                    {/* DRAG HANDLE */}
                    <PanelResizeHandle className="w-[5px] bg-gray-700 hover:bg-gray-500 cursor-col-resize transition" />

                    {/* RIGHT PANEL */}
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0B0B0F] p-4 flex flex-col">

                            <h2 className="text-white text-lg font-semibold mb-3">
                                Reviews
                            </h2>

                            <div
                                className="bg-[#1A1A1D] rounded-lg p-4 flex-grow overflow-auto custom-scroll text-gray-300 text-sm"
                                style={{ whiteSpace: "pre-wrap" }}
                            >
                                <pre
                                    dangerouslySetInnerHTML={{ __html: highlighted }}
                                />
                            </div>
                        </div>
                    </Panel>

                </PanelGroup>

            </div>
        </div>
    );
}

export default Codereview;
