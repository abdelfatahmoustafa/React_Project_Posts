import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "@/api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionBody, setSectionBody] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);

    const navigate = useNavigate();

    const authStore = localStorage.getItem("auth-store");
    let token = null;
    let userId1 = null;

    if (authStore) {
        const parsed = JSON.parse(authStore);
        token = parsed.state?.token || null;
        if (token) {
            const decoded = jwtDecode(token);
            userId1 = decoded.id;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = userId1;

        const postData = {
            title,
            content,
            userId,
            sections: [
                {
                    title: sectionTitle,
                    body: sectionBody,
                },
            ],
        };

        try {
            await APIClient.post("/posts", postData);
            toast.success("Post created successfully!");
            navigate("/user-posts");
        } catch (err) {
            console.error("Failed to create post:", err);
            toast.error("Failed to create post");
        }
    };

    return (
        <div className="min-vh-100" style={{ position: 'relative' }}>
            {/* Background with animated gradient - same as profile */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                zIndex: -2
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
                    `,
                    animation: 'gradientShift 15s ease-in-out infinite'
                }}></div>
            </div>

            <div className="container" style={{ maxWidth: "800px", padding: "2rem 0" }}>
                <div className="card shadow-lg border-0" style={{
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)"
                }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold" style={{
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "2.5rem"
                            }}>
                                ✨ Create New Post
                            </h2>
                            <p className="text-muted">Share your thoughts with the world</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    📝 Post Title
                                </label>
                                <input 
                                    className="form-control form-control-lg" 
                                    style={{
                                        borderRadius: "12px",
                                        border: "2px solid #e9ecef",
                                        padding: "12px 16px",
                                        fontSize: "1.1rem",
                                        transition: "all 0.3s ease"
                                    }}
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required 
                                    placeholder="Enter your post title..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    📄 Main Content
                                </label>
                                <textarea 
                                    className="form-control" 
                                    rows="5" 
                                    style={{
                                        borderRadius: "12px",
                                        border: "2px solid #e9ecef",
                                        padding: "16px",
                                        fontSize: "1rem",
                                        resize: "none",
                                        transition: "all 0.3s ease"
                                    }}
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)} 
                                    required 
                                    placeholder="Write your main content here..."
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    🏷️ Section Title
                                </label>
                                <input 
                                    className="form-control form-control-lg" 
                                    style={{
                                        borderRadius: "12px",
                                        border: "2px solid #e9ecef",
                                        padding: "12px 16px",
                                        fontSize: "1.1rem",
                                        transition: "all 0.3s ease"
                                    }}
                                    value={sectionTitle} 
                                    onChange={(e) => setSectionTitle(e.target.value)} 
                                    required 
                                    placeholder="Enter section title..."
                                />
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-semibold text-dark mb-2">
                                    📝 Section Content
                                </label>
                                <textarea 
                                    className="form-control" 
                                    rows="6" 
                                    style={{
                                        borderRadius: "12px",
                                        border: "2px solid #e9ecef",
                                        padding: "16px",
                                        fontSize: "1rem",
                                        resize: "none",
                                        transition: "all 0.3s ease"
                                    }}
                                    value={sectionBody} 
                                    onChange={(e) => setSectionBody(e.target.value)} 
                                    required 
                                    placeholder="Write your section content here..."
                                />
                            </div>

                            <div className="d-flex justify-content-between gap-3">
                                <button 
                                    type="submit" 
                                    className="btn btn-lg flex-fill"
                                    style={{
                                        background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                                        border: "none",
                                        borderRadius: "12px",
                                        padding: "14px 28px",
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        color: "white",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)"
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.4)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.3)";
                                    }}
                                >
                                    🚀 Create Post
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-lg flex-fill"
                                    style={{
                                        background: "linear-gradient(135deg, #6c757d 0%, #495057 100%)",
                                        border: "none",
                                        borderRadius: "12px",
                                        padding: "14px 28px",
                                        fontSize: "1.1rem",
                                        fontWeight: "600",
                                        color: "white",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 4px 15px rgba(108, 117, 125, 0.3)"
                                    }}
                                    onClick={() => setShowCancelModal(true)}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.boxShadow = "0 6px 20px rgba(108, 117, 125, 0.4)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "0 4px 15px rgba(108, 117, 125, 0.3)";
                                    }}
                                >
                                    ❌ Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
                <Modal.Header closeButton style={{ borderBottom: "none", padding: "1.5rem 1.5rem 0.5rem" }}>
                    <Modal.Title className="fw-bold">⚠️ Cancel Creation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <p className="mb-0">Are you sure you want to cancel and leave this page? All your progress will be lost.</p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: "none", padding: "0.5rem 1.5rem 1.5rem" }}>
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowCancelModal(false)}
                        style={{
                            borderRadius: "8px",
                            padding: "8px 20px",
                            fontWeight: "500"
                        }}
                    >
                        No, Continue
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => navigate("/user-posts")}
                        style={{
                            borderRadius: "8px",
                            padding: "8px 20px",
                            fontWeight: "500"
                        }}
                    >
                        Yes, Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <style jsx>{`
                @keyframes gradientShift {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
