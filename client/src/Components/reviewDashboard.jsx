import React, {useEffect, useState} from "react"
import ReactMarkdown from 'react-markdown'
import axios from "axios"

const ReviewDashboard = () => {
    const [reviews, setReviews] = useState([])
    const [selectedReview, setSelectedReview] = useState(null)

    useEffect(() => {
        axios.post("http://localhost:3000/api/code/review/your-username/your-repo")
            .then(res => setReviews(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="dashboard-container" style={{ display: 'flex', gap: '20px' }}>
            
            {/* Sidebar: List of PRs */}
            <div className="sidebar" style={{ width: '300px', borderRight: '1px solid #ccc' }}>
                <h2>Recent PRs</h2>
                {reviews.map(review => (
                    <div 
                        key={review._id} 
                        onClick={() => setSelectedReview(review)}
                        style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                    >
                        <strong>#{review.prNumber} {review.prTitle}</strong>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                            {new Date(review.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content: The AI Review */}
            <div className="review-content" style={{ flex: 1, padding: '20px' }}>
                {selectedReview ? (
                    <div>
                        <h1>Review for PR #{selectedReview.prNumber}</h1>
                        <div className="markdown-body" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                            {/* THIS RENDERS THE MARKDOWN PROPERLY */}
                            <ReactMarkdown>
                                {selectedReview.aiReview}
                            </ReactMarkdown>
                        </div>
                    </div>
                ) : (
                    <p>Select a Pull Request to see the AI review.</p>
                )}
            </div>
        </div>
    )
}

export default ReviewDashboard