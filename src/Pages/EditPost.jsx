import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIClient } from "@/api";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

export default function EditPost() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sectionTitle, setSectionTitle] = useState("");
    const [sectionBody, setSectionBody] = useState("");
    const [sectionId, setSectionId] = useState(null);

    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await APIClient.get(`/posts/${postId}`);
                const post = response.data;

                setTitle(post.title);
                setContent(post.content);

                if (post.sections && post.sections.length > 0) {
                    const firstSection = post.sections[0];
                    setSectionId(firstSection.id);  
                    setSectionTitle(firstSection.title);
                    setSectionBody(firstSection.body);
                }
            } catch (err) {
                console.error("Failed to load post:", err);
                toast.error("Error loading post data");
            }
        };

        fetchPost();
    }, [postId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title,
            content,
            sections: [
                {
                    id: sectionId,
                    title: sectionTitle,
                    body: sectionBody,
                },
            ],
        };

        try {
            await APIClient.put(`/posts/${postId}`, updatedPost);
            toast.success("Post updated successfully!");
            navigate("/user-posts");
        } catch (err) {
            console.error("Failed to update post:", err);
            toast.error("Failed to update post");
        }
    };

    return (
        <div className="min-vh-100" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem 0'
        }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <div className="card shadow-lg border-0" style={{ 
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold text-primary mb-2" style={{ 
                                fontSize: '2.5rem',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Edit Post
                            </h2>
                            <div className="w-25 mx-auto" style={{ 
                                height: '4px',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                borderRadius: '2px'
                            }}></div>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <label className="form-label fw-semibold text-muted mb-2">
                                        <i className="fas fa-heading me-2"></i>
                                        Post Title
                                    </label>
                                    <input
                                        className="form-control form-control-lg"
                                        style={{
                                            borderRadius: '12px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px 20px',
                                            fontSize: '1.1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="Enter post title..."
                                    />
                                </div>

                                <div className="col-12 mb-4">
                                    <label className="form-label fw-semibold text-muted mb-2">
                                        <i className="fas fa-file-alt me-2"></i>
                                        Post Content
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        style={{
                                            borderRadius: '12px',
                                            border: '2px solid #e9ecef',
                                            padding: '15px 20px',
                                            fontSize: '1rem',
                                            resize: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        placeholder="Write your post content here..."
                                    />
                                </div>

                                <div className="col-12 mb-4">
                                    <div className="card border-0" style={{ 
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '15px'
                                    }}>
                                        <div className="card-body p-4">
                                            <h5 className="text-primary mb-3">
                                                <i className="fas fa-layer-group me-2"></i>
                                                Section Details
                                            </h5>
                                            
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted mb-2">
                                                    Section Title
                                                </label>
                                                <input
                                                    className="form-control"
                                                    style={{
                                                        borderRadius: '10px',
                                                        border: '2px solid #e9ecef',
                                                        padding: '10px 15px',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    value={sectionTitle}
                                                    onChange={(e) => setSectionTitle(e.target.value)}
                                                    required
                                                    placeholder="Enter section title..."
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted mb-2">
                                                    Section Body
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    style={{
                                                        borderRadius: '10px',
                                                        border: '2px solid #e9ecef',
                                                        padding: '12px 15px',
                                                        resize: 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    value={sectionBody}
                                                    onChange={(e) => setSectionBody(e.target.value)}
                                                    required
                                                    placeholder="Write section content here..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg px-5"
                                    style={{
                                        borderRadius: '12px',
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        border: 'none',
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                                    }}
                                >
                                    <i className="fas fa-save me-2"></i>
                                    Update Post
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-lg px-4"
                                    onClick={() => setShowCancelModal(true)}
                                    style={{
                                        borderRadius: '12px',
                                        borderWidth: '2px',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal تأكيد الإلغاء */}
            <Modal 
                show={showCancelModal} 
                onHide={() => setShowCancelModal(false)}
                centered
            >
                <Modal.Header closeButton style={{ borderBottom: 'none' }}>
                    <Modal.Title className="text-primary fw-bold">
                        <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                        Cancel Editing
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <p className="mb-0 text-muted">
                        Are you sure you want to cancel and leave this page? 
                        <br />
                        <small className="text-danger">All unsaved changes will be lost.</small>
                    </p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: 'none' }}>
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowCancelModal(false)}
                        style={{ borderRadius: '8px' }}
                    >
                        No, Continue Editing
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => navigate("/user-posts")}
                        style={{ borderRadius: '8px' }}
                    >
                        Yes, Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
