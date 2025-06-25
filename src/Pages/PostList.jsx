import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "@/api";
import { Eye, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import "../styles/posts-style.css";

export default function AllPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await APIClient.get("/posts");
        const rawPosts = response.data;

        const enrichedPosts = await Promise.all(
          rawPosts.map(async (post) => {
            try {
              const userRes = await APIClient.get(`/users/${post.userId}`);
              const avatarFileName = userRes.data.avatar;

              return {
                ...post,
                author: {
                  name: userRes.data.name,
                  avatar: avatarFileName
                    ? `http://localhost:3000/uploads/${avatarFileName}`
                    : "https://ui-avatars.com/api/?name=User&background=6c757d&color=fff",
                },
                createdAt: post.createdAt || new Date().toISOString(),
              };
            } catch {
              return {
                ...post,
                author: {
                  name: "Unknown",
                  avatar:
                    "https://ui-avatars.com/api/?name=Unknown&background=6c757d&color=fff",
                },
                createdAt: post.createdAt || new Date().toISOString(),
              };
            }
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const formatDate = (dateStr) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div style={{ position: 'relative' }}>
        {/* Background with animated gradient */}
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

        <div className="container py-5">
          <div className="text-center py-5">
            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                 style={{ width: '80px', height: '80px', opacity: 0.9 }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p className="text-white" style={{ opacity: 0.9 }}>Loading posts...</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradientShift {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ position: 'relative' }}>
        {/* Background with animated gradient */}
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

        <div className="container py-5">
          <div className="alert alert-danger text-center" style={{ 
            background: 'rgba(220, 53, 69, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(220, 53, 69, 0.3)'
          }}>
            {error}
            <button
              className="btn btn-sm btn-outline-light ms-3"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradientShift {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
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

      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div className="container py-4">
          <div className="text-center">
            <h1 className="display-5 fw-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>All Posts</h1>

            {posts.length > 0 && (
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill small mt-2" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <BookOpen size={16} className="text-white" />
                <span className="text-white">{posts.length} posts available</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-fluid px-0 py-5">
        {posts.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                 style={{ width: '120px', height: '120px', opacity: 0.9 }}>
              <Eye size={32} className="text-muted" />
            </div>
            <h5 className="text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>No posts found.</h5>
            <p className="text-white" style={{ opacity: 0.9 }}>Check back later for new content!</p>
          </div>
        ) : (
          <div className="row g-0">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6">
                <div className="post-card glass-card h-100 border-0 overflow-hidden position-relative" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {/* Gradient Accent Bar */}
                  <div className="post-card-accent" />
                  {/* Card Header */}
                  <div className="card-header bg-transparent border-bottom-0 pb-0 px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title mb-0 text-truncate flex-grow-1 pe-2 fw-semibold">
                        {post.title}
                      </h5>
                      <button
                        onClick={() => handleView(post.id)}
                        className="btn btn-outline-primary btn-pill post-view-btn"
                      >
                        <div className="d-flex align-items-center gap-1">
                          <span>View</span>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body pt-2 px-4">
                    <p className="card-text text-muted small mb-0">
                      {post.content.length > 150
                        ? `${post.content.substring(0, 150)}...`
                        : post.content}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer bg-transparent border-top-0 pt-0 px-4 pb-4">
                    <div className="d-flex align-items-center mt-2">
                      <div className="author-avatar me-3 flex-shrink-0">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="rounded-circle border border-2 border-white shadow-sm"
                          width="44"
                          height="44"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              post.author.name
                            )}&background=6c757d&color=fff`;
                          }}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center mb-1 gap-1">
                          <User size={15} className="text-muted" />
                          <span className="fw-semibold text-truncate author-name">
                            {post.author.name}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-muted" />
                          <span className="text-muted small author-date">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
