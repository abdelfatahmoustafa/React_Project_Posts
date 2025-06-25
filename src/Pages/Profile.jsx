import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/api/user";
import { APIClient } from "@/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    avatar: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userPostsCount, setUserPostsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getMe();
        const userData = res.data;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          username: userData.username || "",
          phone: userData.phone || "",
          avatar: userData.avatar || "",
        });

        const postsRes = await APIClient.get("/posts");
        const userPosts = postsRes.data.filter((post) => post.userId === userData.id);
        setUserPostsCount(userPosts.length);
      } catch (err) {
        console.error("❌ Failed to fetch user or posts:", err);
        toast.error("Failed to load profile data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload;

      if (newAvatar) {
        payload = new FormData();
        for (const key in formData) {
          payload.append(key, formData[key]);
        }
        payload.append("avatar", newAvatar);
        payload.append("password", "placeholder");
      } else {
        payload = { ...formData, password: "placeholder" };
      }
      

      await updateMe(user.id, payload);
      toast.success("Profile updated successfully ✅");
      setUser((prev) => ({ ...prev, ...formData }));
    } catch (err) {
      console.error("❌ Failed to update:", err);
      toast.error("Failed to update profile ❌");
    }
  };

  const avatarURL = preview
    ? preview
    : formData.avatar
      ? `http://localhost:3000/uploads/${formData.avatar}`
      : "/default-avatar.png";

  return (
    <div className="profile-container">
      <ToastContainer />
      
      {/* Background Gradient */}
      <div className="profile-background">
        <div className="gradient-overlay"></div>
      </div>

      {/* Main Profile Card */}
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar-container">
              <label htmlFor="avatarInput" className="avatar-label">
                <img
                  src={avatarURL}
                  alt="Profile Avatar"
                  className="profile-avatar"
                />
                <div className="avatar-overlay">
                  <i className="fas fa-camera"></i>
                </div>
              </label>
              <input
                type="file"
                id="avatarInput"
                className="avatar-input"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </div>
            <div className="user-info">
              <h1 className="user-name">{formData.name}</h1>
              <p className="user-username">@{formData.username}</p>
              <span className="user-role">Front-End Developer</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">{userPostsCount}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">210</div>
            <div className="stat-label">Followers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">35</div>
            <div className="stat-label">Likes</div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <h2 className="form-title">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            <button type="submit" className="update-btn">
              <span>Update Profile</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
