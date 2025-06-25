import { useAuthStore } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "@/api/user";

export default function Navbar() {
  const { token, clear } = useAuthStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getMe();
          setUser(res.data);
        } catch (e) {
 
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        padding: "1rem 0",
        position: "relative",
        zIndex: "9998",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold text-white"
          to="/"
          style={{
            fontSize: "1.8rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          ✨ BlogNest
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/"
                style={{
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  margin: "0 0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/posts"
                style={{
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  borderRadius: "8px",
                  padding: "0.5rem 1rem",
                  margin: "0 0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                📝 Posts
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {token && user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle d-flex align-items-center text-white"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "25px",
                    padding: "0.5rem 1rem",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    zIndex:"1000"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.2)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={`http://localhost:3000/uploads/${user.avatar}`}
                    alt="avatar"
                    width="35"
                    height="35"
                    className="rounded-circle me-2"
                    style={{
                      objectFit: "cover",
                      border: "2px solid rgba(255,255,255,0.5)",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  />
                  <span className="fw-semibold">{user.name}</span>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(15px)",
                    border: "none",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    padding: "0.5rem 0",
                    zIndex: "9999",
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    minWidth: "200px",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/user-posts"
                      style={{
                        padding: "0.75rem 1.5rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        e.target.style.color = "white";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "inherit";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      📄 My Posts
                    </Link>
                  </li>
                  <li>
                    <hr
                      className="dropdown-divider"
                      style={{ margin: "0.5rem 0" }}
                    />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      to="/profile"
                      style={{
                        padding: "0.75rem 1.5rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        e.target.style.color = "white";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "inherit";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      👤 Profile
                    </Link>
                  </li>
                  <li>
                    <hr
                      className="dropdown-divider"
                      style={{ margin: "0.5rem 0" }}
                    />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => {
                        clear();
                        navigate("/auth");
                      }}
                      style={{
                        padding: "0.75rem 1.5rem",
                        transition: "all 0.2s ease",
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)";
                        e.target.style.color = "white";
                        e.target.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "inherit";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white fw-semibold"
                    to="/auth"
                    style={{
                      fontSize: "1.1rem",
                      background: "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderRadius: "25px",
                      padding: "0.75rem 1.5rem",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.3)";
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    ✨ Join Now
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
