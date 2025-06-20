// src/pages/PostPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../utils/postUtils";
import "../styles/PostPage.css";
import Footer from "../components/Footer";
const PostPage = () => {
  const { id } = useParams(); // get post ID from URL
  const post = getPostById(id); // retrieve the post using the ID

  if (!post) {
    return (
      <div className="post-detail-container">
        <h1 className="post-title">Post not found</h1>
        <p className="post-meta">The article you’re looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">By {post.author || "Admin"} | {post.date}</p>
      <div className="post-body">
        <p>{post.fullContent}</p>
      </div>
      
       <Footer />
    </div>
  );
};

export default PostPage;
