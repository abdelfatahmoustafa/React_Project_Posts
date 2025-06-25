import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { APIClient } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function UserPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        const authStore = localStorage.getItem("auth-store");
        if (authStore) {
            const parsed = JSON.parse(authStore);
            const token = parsed.state?.token;
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUserId(decoded.id);
                } catch (error) {
                    console.error("Failed to decode token:", error);
                }
            }
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await APIClient.get("/posts");
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
        };

        fetchPosts();
    }, []);

    const handleCreate = () => {
        navigate("/posts/create");
    };

    const handleView = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const confirmDelete = (postId) => {
        setPostIdToDelete(postId);
        setShowConfirmModal(true);
    };

    const deletePost = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("auth-store"))?.state?.token;

            await APIClient.delete(`/posts/${postIdToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPosts((prev) => prev.filter((post) => post.id !== postIdToDelete));
            toast.success("Post deleted successfully!", { position: "top-right" });
        } catch (err) {
            console.error("Failed to delete post:", err);
            toast.error("Failed to delete post", { position: "top-right" });
        } finally {
            setShowConfirmModal(false);
            setPostIdToDelete(null);
        }
    };

    const filteredPosts = posts.filter((post) => post.userId === userId);

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

            <ToastContainer />
            <div className="container py-5">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>My Posts</h1>
                    <p className="lead text-white" style={{ opacity: 0.9 }}>Manage and organize your content</p>
                </div>

                {/* Create Button */}
                <div className="text-center mb-5">
                    <button 
                        className="btn btn-light btn-lg px-4 py-3 shadow-sm" 
                        onClick={handleCreate}
                        style={{ 
                            borderRadius: '50px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            fontWeight: '600'
                        }}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Create New Post
                    </button>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="empty-state">
                            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                 style={{ width: '120px', height: '120px', opacity: 0.9 }}>
                                <i className="fas fa-file-alt fa-3x text-muted"></i>
                            </div>
                            <h3 className="text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>No posts yet</h3>
                            <p className="text-white mb-4" style={{ opacity: 0.9 }}>Start creating your first post to get started!</p>
                            <button 
                                className="btn btn-outline-light btn-lg" 
                                onClick={handleCreate}
                                style={{ 
                                    borderRadius: '25px',
                                    border: '2px solid rgba(255, 255, 255, 0.5)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                Create Your First Post
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredPosts.map((post, index) => (
                            <div key={post.id} className="col-lg-6 col-xl-4">
                                <div className="card h-100 shadow-lg border-0" style={{ 
                                    borderRadius: '15px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title fw-bold text-dark mb-0" style={{ fontSize: '1.1rem' }}>
                                                {post.title}
                                            </h5>
                                            <span className="badge bg-primary rounded-pill">#{post.id}</span>
                                        </div>
                                        
                                        <p className="card-text text-muted mb-4" style={{ lineHeight: '1.6' }}>
                                            {post.content.length > 120 
                                                ? post.content.slice(0, 120) + "..." 
                                                : post.content
                                            }
                                        </p>
                                        
                                        <div className="d-flex gap-2 flex-wrap">
                                            <button 
                                                className="btn btn-outline-primary btn-sm flex-fill" 
                                                onClick={() => handleView(post.id)}
                                                style={{ borderRadius: '25px' }}
                                            >
                                                <i className="fas fa-eye me-1"></i>
                                                View
                                            </button>
                                            <button 
                                                className="btn btn-outline-warning btn-sm flex-fill" 
                                                onClick={() => navigate(`/posts/${post.id}/edit`)}
                                                style={{ borderRadius: '25px' }}
                                            >
                                                <i className="fas fa-edit me-1"></i>
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm flex-fill" 
                                                onClick={() => confirmDelete(post.id)}
                                                style={{ borderRadius: '25px' }}
                                            >
                                                <i className="fas fa-trash me-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer bg-transparent border-0 pt-0">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">
                                                <i className="fas fa-calendar me-1"></i>
                                                Post #{post.id}
                                            </small>
                                            <small className="text-muted">
                                                <i className="fas fa-user me-1"></i>
                                                Your Post
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Posts Counter */}
                {filteredPosts.length > 0 && (
                    <div className="text-center mt-5">
                        <div className="bg-white rounded-pill px-4 py-2 shadow-sm d-inline-block" style={{ 
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}>
                            <span className="text-dark">
                                <i className="fas fa-chart-bar me-2"></i>
                                Total Posts: <strong className="text-primary">{filteredPosts.length}</strong>
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="text-danger">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Confirm Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <div className="text-center">
                        <i className="fas fa-question-circle fa-2x text-warning mb-3"></i>
                        <p className="mb-0">Are you sure you want to delete this post? This action cannot be undone.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button 
                        variant="light" 
                        onClick={() => setShowConfirmModal(false)}
                        style={{ borderRadius: '25px' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={deletePost}
                        style={{ borderRadius: '25px' }}
                    >
                        <i className="fas fa-trash me-1"></i>
                        Delete
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
