import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIClient } from "@/api";

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await APIClient.get(`/posts/${postId}`);
                setPost(res.data);

                // Fetch author info
                const userRes = await APIClient.get(`/users/${res.data.userId}`);
                const avatarFileName = userRes.data.avatar;

                setAuthor({
                    name: userRes.data.name,
                    avatar: avatarFileName
                        ? `http://localhost:3000/uploads/${avatarFileName}`
                        : "/default-avatar.png",
                });
            } catch (err) {
                console.error("Failed to fetch post or author:", err);
                alert("Failed to load post details");
            }
        };

        fetchPost();
    }, [postId]);

    const handleBack = () => {
        navigate("/posts");
    };

    if (!post) return <p className="text-center mt-5">Loading...</p>;

    // Create a fake date for display (replace this with real date if available)
    const fakeCreatedAt = new Date(Date.now() - post.id * 3600000); // Each ID = older by an hour
    const formattedDate = fakeCreatedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="container py-5">
            <div className="mb-4">
                <button
                    className="btn fw-bold px-4 py-2 shadow-sm border-0"
                    style={{
                        background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                        color: "#fff",
                        borderRadius: "2rem",
                        fontSize: "1.1rem",
                        letterSpacing: "0.5px",
                        transition: "background 0.3s, box-shadow 0.3s",
                        boxShadow: "0 2px 12px rgba(37,99,235,0.12)",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1e40af 0%, #2563eb 100%)'}
                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)'}
                    onClick={handleBack}
                >
                    <span style={{fontSize: "1.3rem", marginRight: "10px", verticalAlign: "middle"}}>←</span>
                    <span style={{verticalAlign: "middle"}}>Back to Posts</span>
                </button>
            </div>

            <div className="card border-0 shadow-lg p-0 overflow-hidden" style={{ borderRadius: "1.5rem" }}>
                {/* Header Section */}
                <div className="d-flex align-items-center bg-primary bg-gradient text-white p-4" style={{ minHeight: "120px" }}>
                    {author && (
                        <img
                            src={author.avatar}
                            alt="Author avatar"
                            className="rounded-circle border border-3 border-white shadow-sm me-4"
                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                        />
                    )}
                    <div>
                        <h2 className="mb-1" style={{ fontWeight: 700 }}>{post.title}</h2>
                        {author && (
                            <div className="d-flex align-items-center">
                                <span className="fw-semibold me-2">{author.name}</span>
                                <span className="badge bg-light text-primary ms-2" style={{ fontSize: "0.9rem" }}>
                                    {formattedDate}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <p className="text-secondary fs-5 mb-4" style={{ lineHeight: 1.7 }}>{post.content}</p>

                    <hr className="my-4" />
                    <h4 className="mb-3 text-primary">Sections</h4>

                    {post.sections && post.sections.length > 0 ? (
                        <div className="row g-4">
                            {post.sections.map((section, index) => (
                                <div key={index} className="col-12 col-md-6">
                                    <div className="h-100 p-3 border-0 shadow-sm rounded-4 bg-light-subtle">
                                        <h5 className="mb-2 text-dark fw-bold">{section.title}</h5>
                                        <p className="mb-0 text-secondary">{section.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">No sections available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
