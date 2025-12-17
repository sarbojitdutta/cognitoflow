import React, { useEffect, useState } from "react";
import axios from "axios";
import { DiffEditor } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import hljs from "highlight.js/lib/common";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "highlight.js/styles/github-dark.css";

function Codereview() {
    const [code, setCode] = useState("");
    const [review, setReview] = useState("");
    const [detectedLang, setDetectedLang] = useState("javascript");
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            if (!code.trim()) return alert("Please enter some code.");

            const res = await axios.post("http://localhost:3000/api/code/review", { code });

            setReview(res.data.review);
        } catch (error) {
            console.error(error);
            alert("Error reviewing code.");
        }
        setLoading(false);
    }

    return (
        <div className="bg-[#0B0B0F] w-full h-screen p-4">
            <div className="w-full h-full border border-gray-800 rounded-xl overflow-hidden">

                <PanelGroup direction="horizontal">

                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0B0B0F] p-4 flex flex-col">
                            <div className="flex flex-column gap-8 ml-36">
                                <button onClick={() => {
                                    setCode("")
                                    setReview("")
                                }} className="bg-zinc-800 border-white hover:bg-zinc-700 text-white w-22 mb-2 px-2 py-2 rounded-lg cursor-pointer transition-colors duration-300">
                                    Reset
                                </button>
                                <button
                                    onClick={handleReview}
                                    disabled={loading}
                                    className="bg-purple-600 hover:bg-purple-700 text-white w-25 mb-2 px-2 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                                >
                                    {loading ? "Improving..." : "Audit Code"}
                                </button>

                            </div>

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

                    <PanelResizeHandle className="w-[5px] bg-gray-700 hover:bg-gray-500 cursor-col-resize transition" />

                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0B0B0F] p-4 flex flex-col">

                            <h2 className="text-white text-lg font-semibold mb-3">
                                Improved code
                            </h2>

                            <div className="flex-grow rounded-lg overflow-hidden">
                                <DiffEditor
                                    height="100%"
                                    theme="vs-dark"
                                    original={code}
                                    modified={review}
                                    language={detectedLang}
                                    options={{
                                        renderSideBySide: true,
                                        readOnly: true,
                                    }}
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
