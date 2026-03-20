import React, { useEffect, useState } from "react";
import axios from "axios";
import { DiffEditor } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import hljs from "highlight.js/lib/common";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "highlight.js/styles/github-dark.css";
import { RotateCcw, Zap, Code2 } from "lucide-react";

function Codereview() {
    const [code, setCode] = useState("");
    const [review, setReview] = useState("");
    const [detectedLang, setDetectedLang] = useState("");
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
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/code/review`, { code });
            setReview(res.data.review);
        } catch (error) {
            console.error(error);
            alert("Error reviewing code.");
        }
        setLoading(false);
    }

    return (
        <div className="bg-[#0a0a0a] w-full h-screen p-4 relative">


            <div className="relative z-10 w-full h-full border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">

                <PanelGroup direction="horizontal">
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0a0a0a]/90 backdrop-blur-sm p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-5 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full" />
                                    <span className="text-gray-300 text-sm font-semibold tracking-wide">Code Input</span>
                                    {detectedLang && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono uppercase tracking-wider">
                                            {detectedLang}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => { setCode(""); setReview(""); }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f1a0f] border border-emerald-900/50 hover:border-emerald-500/30 text-gray-400 hover:text-gray-200 text-xs font-medium transition-all duration-200 group"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleReview}
                                        disabled={loading}
                                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-emerald-900 disabled:to-green-900 disabled:text-gray-600 text-white text-xs font-semibold transition-all duration-200 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                                                Auditing...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="w-3.5 h-3.5" />
                                                Audit Code
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Editor */}
                            <div className="flex-grow rounded-xl overflow-hidden border border-emerald-900/30 shadow-inner shadow-black/40">
                                <Editor
                                    height="100%"
                                    theme="vs-dark"
                                    defaultLanguage={detectedLang}
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    options={{
                                        fontSize: 13,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        padding: { top: 12 },
                                    }}
                                />
                            </div>
                        </div>
                    </Panel>

                    {/* ── Resize Handle ── */}
                    <PanelResizeHandle className="w-[4px] bg-emerald-900/30 hover:bg-emerald-500/50 cursor-col-resize transition-colors duration-200 relative group">
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-emerald-500/0 group-hover:bg-emerald-400/30 transition-colors duration-200" />
                    </PanelResizeHandle>

                    {/* ── Right Panel: Diff Output ── */}
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full w-full bg-[#0a0a0a]/90 backdrop-blur-sm p-4 flex flex-col">

                            {/* Panel Header */}
                            <div className="flex items-center gap-2 mb-4 px-1">
                                <div className="w-1.5 h-5 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full" />
                                <span className="text-gray-300 text-sm font-semibold tracking-wide">Improved Code</span>
                                {review && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                                        ✦ AI Enhanced
                                    </span>
                                )}
                            </div>

                            {/* Diff Editor or Placeholder */}
                            <div className="flex-grow rounded-xl overflow-hidden border border-emerald-900/30 shadow-inner shadow-black/40">
                                {review ? (
                                    <DiffEditor
                                        height="100%"
                                        theme="vs-dark"
                                        original={code}
                                        modified={review}
                                        language={detectedLang}
                                        options={{
                                            renderSideBySide: true,
                                            readOnly: true,
                                            fontSize: 13,
                                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            padding: { top: 12 },
                                        }}
                                    />
                                ) : (
                                    <div className="h-full w-full flex flex-col items-center justify-center gap-4 bg-[#080f08]">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                            <Code2 className="w-7 h-7 text-emerald-500/50" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-500 text-sm font-medium">No review yet</p>
                                            <p className="text-gray-700 text-xs mt-1">Paste your code and click Audit Code</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Panel>

                </PanelGroup>

            </div>
        </div>
    );
}

export default Codereview;