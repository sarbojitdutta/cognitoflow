import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaGitAlt, FaCode, FaClock } from "react-icons/fa"; // npm install react-icons

const ReviewDashboard = () => {
    const [reviews, setReviews] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const { owner, repo, prNumber } = useParams();

    useEffect(() => {
        // Use params if available, otherwise default (or you could prompt user)
        const currentOwner = owner || "sarbojitdutta";
        const currentRepo = repo || "cognitoflow";

        axios.get(`http://localhost:3000/api/code/review/${currentOwner}/${currentRepo}`)
            .then(res => {
                setReviews(res.data);
                
                // Auto-select if prNumber exists in URL
                if (prNumber) {
                    const linkedReview = res.data.find(r => r.prNumber === parseInt(prNumber));
                    if (linkedReview) setSelectedReview(linkedReview);
                }
            })
            .catch(err => console.error(err));
    }, [owner, repo, prNumber]);

    return (
        <div className="flex h-screen bg-gray-950 text-gray-300 font-sans overflow-hidden">
            
            {/* --- SIDEBAR: PR LIST --- */}
            <div className="w-80 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaGitAlt className="text-orange-500" /> 
                        PR History
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Select a PR to view insights</p>
                </div>

                <div className="overflow-y-auto flex-1 p-2 space-y-2 custom-scrollbar">
                    {reviews.map(review => (
                        <div 
                            key={review._id} 
                            onClick={() => setSelectedReview(review)}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                                selectedReview?._id === review._id 
                                ? 'bg-blue-900/20 border-blue-500/50 shadow-md' 
                                : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-blue-400 font-mono text-xs font-bold bg-blue-900/30 px-2 py-0.5 rounded">
                                    #{review.prNumber}
                                </span>
                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                    <FaClock /> {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-200 line-clamp-1" title={review.prTitle}>
                                {review.prTitle || "Untitled Pull Request"}
                            </h3>
                        </div>
                    ))}
                    
                    {reviews.length === 0 && (
                        <div className="text-center py-10 text-gray-600 text-sm">
                            No reviews found.
                        </div>
                    )}
                </div>
            </div>

            {/* --- MAIN CONTENT: AI REVIEW --- */}
            <div className="flex-1 flex flex-col h-full bg-gray-950">
                {selectedReview ? (
                    <>
                        {/* Header */}
                        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <FaCode className="text-white text-lg" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">
                                        Review Analysis 
                                        <span className="ml-3 text-gray-500 font-normal text-sm">
                                            PR #{selectedReview.prNumber}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                            <a 
                                href={`https://github.com/${owner || "sarbojitdutta"}/${repo || "cognitoflow"}/pull/${selectedReview.prNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-md transition"
                            >
                                View on GitHub ↗
                            </a>
                        </div>

                        {/* Markdown Viewer */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="max-w-4xl mx-auto">
                                <article className="prose prose-invert prose-blue max-w-none 
                                    prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                    prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-gray-800
                                    prose-code:text-blue-300 prose-strong:text-white prose-a:text-blue-400">
                                    
                                    <ReactMarkdown>
                                        {selectedReview.aiReview}
                                    </ReactMarkdown>

                                </article>
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty State
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="bg-gray-900 p-6 rounded-full mb-4">
                            <FaCode className="text-4xl text-gray-700" />
                        </div>
                        <p className="text-lg font-medium">Select a Pull Request to view the AI analysis</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewDashboard;