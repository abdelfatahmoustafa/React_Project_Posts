import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "@/api";
import { ArrowRight, Calendar, User } from "lucide-react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await APIClient.get("/posts");
        // Sort posts by createdAt descending and take the latest 2
        const sortedPosts = response.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const rawPosts = sortedPosts.slice(0, 2);
        // Enrich posts with author info
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
        setError("Failed to load posts");
      } finally {
        setLoading(false);
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

      {/* Hero Section with Carousel */}
      <div className="hero-carousel-section">
        <Carousel fade interval={5000} pause="hover" className="hero-carousel">
          <Carousel.Item>
            <div className="carousel-overlay"></div>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
              alt="Blogging and Writing"
            />
            <Carousel.Caption>
              <div className="caption-content">
                <h3>Welcome to BlogNest</h3>
                <p>Where ideas find their voice and stories come to life</p>
                <button className="btn btn-light btn-lg mt-3 px-4 py-2 rounded-pill">
                  Start Writing
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-overlay"></div>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Reading and Discovery"
            />
            <Carousel.Caption>
              <div className="caption-content">
                <h3>Empowering Readers & Writers</h3>
                <p>Share your stories, inspire the world, and connect with like-minded creators</p>
                <button className="btn btn-light btn-lg mt-3 px-4 py-2 rounded-pill">
                  Explore Posts
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-overlay"></div>
            <img
              className="d-block w-100 carousel-img"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
              alt="Community and Connection"
            />
            <Carousel.Caption>
              <div className="caption-content">
                <h3>Join Our Community</h3>
                <p>Create. Discover. Connect. Be part of something extraordinary</p>
                <button className="btn btn-light btn-lg mt-3 px-4 py-2 rounded-pill">
                  Join Now
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* About Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-white mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>About BlogNest </h2>
          <div className="bg-white rounded-4 p-4 shadow-lg" style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <p className="lead text-dark mb-0">
              BlogNest is a modern blogging platform built for passionate writers
              and curious readers. Whether you're here to publish your stories,
              explore diverse ideas, or connect with creators — this is your space.
            </p>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-white mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Latest Posts</h2>
        </div>
        {loading ? (
          <div className="text-center py-5">
            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                 style={{ width: '80px', height: '80px', opacity: 0.9 }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p className="text-white" style={{ opacity: 0.9 }}>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" style={{ 
            background: 'rgba(220, 53, 69, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(220, 53, 69, 0.3)'
          }}>{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
            <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                 style={{ width: '120px', height: '120px', opacity: 0.9 }}>
              <i className="fas fa-file-alt fa-3x text-muted"></i>
            </div>
            <h5 className="text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>No posts found.</h5>
            <p className="text-white" style={{ opacity: 0.9 }}>Check back later for new content!</p>
          </div>
        ) : (
          <div className="row g-4">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-md-6 d-flex">
                <div className="post-card glass-card h-100 w-100 border-0 overflow-hidden position-relative d-flex flex-column" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {/* Gradient Accent Bar */}
                  <div className="post-card-accent" />
                  {/* Card Header */}
                  <div className="card-header bg-transparent border-bottom-0 pb-0 px-4 pt-4">
                    <h5 className="card-title mb-2 text-truncate fw-semibold">
                      {post.title}
                    </h5>
                  </div>
                  {/* Card Body */}
                  <div className="card-body pt-2 px-4 flex-grow-1">
                    <p className="card-text text-muted mb-0">
                      {post.content.length > 120
                        ? `${post.content.substring(0, 120)}...`
                        : post.content}
                    </p>
                  </div>
                  {/* Card Footer */}
                  <div className="card-footer bg-transparent border-top-0 pt-0 px-4 pb-4">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="d-flex align-items-center">
                        <div className="author-avatar me-3 flex-shrink-0">
                          <img
                            src={
                              post.author?.avatar ||
                              "https://ui-avatars.com/api/?name=User&background=6c757d&color=fff"
                            }
                            alt={post.author?.name || "User"}
                            className="rounded-circle border border-2 border-white shadow-sm"
                            width="44"
                            height="44"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-1 gap-1">
                            <User size={15} className="text-muted" />
                            <span className="fw-semibold text-truncate author-name">
                              {post.author?.name || "User"}
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
                      <button
                        onClick={() => handleView(post.id)}
                        className="btn btn-outline-primary btn-pill post-view-btn ms-2"
                      >
                        <div className="d-flex align-items-center gap-1">
                          <span>Read More</span>
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">What You Can Do Here</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-pencil-square display-5 text-primary mb-3"></i>
            <h5>Write Posts</h5>
            <p>
              Share your thoughts and stories with an easy-to-use post editor.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-search display-5 text-success mb-3"></i>
            <h5>Explore Content</h5>
            <p>
              Browse posts by others, discover trending topics, and stay
              inspired.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-person-circle display-5 text-warning mb-3"></i>
            <h5>Your Profile</h5>
            <p>
              Edit your details, manage your posts, and personalize your space.
            </p>
          </div>
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
