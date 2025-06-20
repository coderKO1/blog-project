import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logoutUser } from "../utils/auth";
import { getPosts, addPost, updatePost, deletePost } from "../utils/postUtils";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    coverImage: "",
    videoUrl: "",
    content: "",
    date: new Date().toLocaleDateString(),
    status: "Published",
    author: user?.firstName || "Anonymous",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewMode, setViewMode] = useState("add"); // 'add', 'edit', 'delete'

  useEffect(() => {
    console.log("User:", user);
    if (!user) {
      navigate("/login");
      return;
    }
    const allPosts = getPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  }, [user, navigate]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, coverImage: reader.result });
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdatePost = () => {
    if (!formData.title || !formData.content)
      return alert("Title & content are required");

    if (isEditing) {
      updatePost({ ...formData, id: editId });
      setIsEditing(false);
      setEditId(null);
    } else {
      addPost(formData);
    }

    const updatedPosts = getPosts();
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);

    setFormData({
      title: "",
      summary: "",
      coverImage: "",
      videoUrl: "",
      content: "",
      date: new Date().toLocaleDateString(),
      status: "Published",
      author: user?.firstName || "Anonymous",
    });
    setPreviewImage("");
  };

  const handleEdit = (post) => {
    setFormData(post);
    setPreviewImage(post.coverImage);
    setEditId(post.id);
    setIsEditing(true);
    setViewMode("edit");
  };

  const handleCancelEdit = () => {
    setFormData({
      title: "",
      summary: "",
      coverImage: "",
      videoUrl: "",
      content: "",
      date: new Date().toLocaleDateString(),
      status: "Published",
      author: user?.firstName || "Anonymous",
    });
    setPreviewImage("");
    setIsEditing(false);
    setEditId(null);
    setViewMode("add");
  };

  const handleDelete = (id) => {
    deletePost(id);
    const updated = getPosts();
    setPosts(updated);
    setFilteredPosts(updated);
  };

  const switchView = (mode) => {
    setViewMode(mode);
    setFormData({
      title: "",
      summary: "",
      coverImage: "",
      videoUrl: "",
      content: "",
      date: new Date().toLocaleDateString(),
      status: "Published",
      author: user?.firstName || "Anonymous",
    });
    setPreviewImage("");
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => switchView("add")}>
            {isEditing ? "✏️ Editing Post" : "➕ Add Post"}
          </li>
          <hr className="sidebar-divider" />
          <li onClick={() => switchView("edit")}>Edit Posts</li>
          <hr className="sidebar-divider" />
          <li onClick={() => switchView("delete")}>Delete Posts</li>
          <hr className="sidebar-divider" />
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                logoutUser();
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </header>

        <section className="posts-section">
          <h2>Blog Posts</h2>

          {viewMode === "add" && (
            <div className="add-post-form modern">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Summary"
                value={formData.summary || ""}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="image-preview"
                />
              )}
              <input
                type="text"
                placeholder="Video URL (optional)"
                value={formData.videoUrl || ""}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
              />
              <textarea
                placeholder="Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <div className="form-actions">
                <button
                  className="add-post-btn"
                  onClick={handleAddOrUpdatePost}
                >
                  {isEditing ? "✅ Update Post" : "➕ Add Post"}
                </button>
                {isEditing && (
                  <button
                    className="cancel-edit-btn"
                    onClick={handleCancelEdit}
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            </div>
          )}

          {viewMode === "edit" && (
            <div className="posts-grid">
              {filteredPosts
                .filter((post) => post.status === "Published")
                .map((post) => (
                  <div key={post.id} className="post-card">
                    <img
                      src={post.coverImage || "/assets/default-cover.jpg"}
                      alt={post.title}
                      className="post-image"
                    />
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.date}</p>
                      <p>
                        Status:{" "}
                        <span
                          className={`status-label ${post.status.toLowerCase()}`}
                        >
                          {post.status}
                        </span>
                      </p>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(post)}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {viewMode === "delete" && (
            <div className="posts-grid">
              {filteredPosts
                .filter((post) => post.status === "Published")
                .map((post) => (
                  <div key={post.id} className="post-card">
                    <img
                      src={post.coverImage || "/assets/default-cover.jpg"}
                      alt={post.title}
                      className="post-image"
                    />
                    <div className="post-content">
                      <h3>{post.title}</h3>
                      <p>{post.date}</p>
                      <p>
                        Status:{" "}
                        <span
                          className={`status-label ${post.status.toLowerCase()}`}
                        >
                          {post.status}
                        </span>
                      </p>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(post.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
  


    </div>
  );
};

export default Dashboard;