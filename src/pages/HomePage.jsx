import React, { useEffect, useState } from "react";
import { getPosts, savePosts } from "../utils/postUtils";
import ScreenshotService from "../utils/ScreenshotService";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Footer from "../components/Footer";

const categories = [
  "Coding",
  "Food & Drink",
  "Cars",
  "Health & Wellness",
  "Technology",
  "Business",
  "Travel",
  "Finance",
  "Education",
  "Gaming",
  "Fashion",
  "Productivity",
];

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const allPosts = getPosts();
    if (allPosts.length === 0) {
      const defaultPosts = [
        {
          id: "1",
          title: "The Future of Coding in 2030",
          content: "With AI-assisted development, the way we write code is evolving rapidly...",
          fullContent: "By 2030, programming is expected to be far more intuitive. Tools like AI pair programmers, low-code platforms, and voice-driven coding will dominate. The focus will shift from syntax to problem-solving and creativity. Developers will orchestrate logic more than write raw code. Security and ethical AI development will also play a larger role...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "2",
          title: "10 Must-Try Street Foods from Around the World",
          content: "From Nigerian suya to Thai pad thai, discover the top street snacks globally...",
          fullContent: "Food tells the story of culture. In Nigeria, suya is a smoky, spicy meat delicacy found on most streets. In Bangkok, pad thai sizzling on a wok is a sensory experience. Turkish simit, Mexican tacos, and Indian vada pav all highlight the creativity of global food culture. Here are 10 delicious street foods every foodie must experience...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "3",
          title: "Electric Cars: Are We Ready for the Shift?",
          content: "EVs are more affordable and accessible than ever—but challenges remain...",
          fullContent: "Electric vehicles (EVs) are no longer futuristic—they’re here. With Tesla, BYD, and others scaling production, EVs are competing on price and range. However, charging infrastructure and battery recycling remain issues. Policy support and innovation will determine how fast the transition happens. This article explores the current state and future of EVs...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "4",
          title: "Mental Health in a Digital Age",
          content: "Social media has changed how we connect—but at what cost to our minds?",
          fullContent: "The digital world offers connection but also distraction and comparison. Depression, anxiety, and burnout are increasing among digital natives. Experts suggest setting screen boundaries, practicing mindfulness, and nurturing in-person relationships. Technology isn't inherently bad—how we use it makes all the difference...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "5",
          title: "AI in Education: A Double-Edged Sword",
          content: "AI tutors and grading bots are revolutionizing education—but what about bias?",
          fullContent: "AI tools can personalize learning, automate feedback, and scale education access. But they can also reinforce biases, widen digital divides, and depersonalize human connection. Teachers must be empowered, not replaced. Ethical, inclusive design is key to making AI a true asset in education...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "6",
          title: "5 Best Coding Languages to Learn in 2025",
          content: "Which programming languages will be most valuable in the job market?",
          fullContent: "Based on trends and industry demand, here are the top 5 languages to learn in 2025: JavaScript (for web apps), Python (AI, data), Go (performance), Rust (security), and TypeScript (scalable JS). Mastering these will make you a versatile developer in the years ahead...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "7",
          title: "The Rise of Digital Nomads",
          content: "Work-from-anywhere is now a lifestyle—what does it take to succeed?",
          fullContent: "From Bali to Lisbon, digital nomads are rewriting the rules of work. Fast Wi-Fi, freelance gigs, and online businesses make it possible. But it’s not all beaches and laptops—challenges include loneliness, visas, and work-life balance. Here's how to thrive as a location-independent professional...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "8",
          title: "Healthy Eating on a Budget",
          content: "Eating well doesn't have to be expensive. Here's how to do it smartly...",
          fullContent: "Budget-friendly healthy eating is possible with planning. Shop in-season, buy in bulk, and cook at home. Beans, grains, and frozen vegetables are nutritious and cheap. Avoid processed snacks and use simple ingredients. This guide helps you eat well for less...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "9",
          title: "How to Start a Successful Podcast",
          content: "From mic setup to monetization—here’s how to launch your voice online...",
          fullContent: "A good podcast needs a niche, clear audio, consistency, and a genuine voice. Start with basic gear, plan your episodes, and promote via social media. Hosting platforms like Anchor or Spotify make distribution easy. With patience and strategy, your podcast can grow into a community and income stream...",
          date: "2025-06-21",
          author: "Admin"
        },
        {
          id: "10",
          title: "Balancing Fitness and Work",
          content: "Struggling to stay active with a 9-5 job? Try these practical tips...",
          fullContent: "You don’t need a gym or two-hour workouts. Micro-sessions (10-15 mins), desk stretches, and weekend hikes make a difference. Schedule workouts like meetings, prep meals ahead, and use standing desks. Health and productivity are linked—here's how to keep both in check...",
          date: "2025-06-21",
          author: "Admin"
        }
      ];
      savePosts(defaultPosts);
      setPosts(defaultPosts);
      setFeaturedPosts(defaultPosts.slice(0, 3));
    } else {
      setPosts(allPosts);
      setFeaturedPosts(allPosts.slice(0, 3));
    }
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <ScreenshotService />

      {/* Top Nav */}
      <header className="nav-header">
        <div className="nav-center">
          <input
            type="text"
            placeholder="Search The Blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={`/category/${encodeURIComponent(cat)}`}
            className="category-tab"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Featured Articles Row */}
      <div className="scroll-container">
        {featuredPosts.map((post, idx) => (
          <div key={idx} className="featured-card no-image">
            <div className="card-info">
              <p className="title">{post.title}</p>
              <span className="meta">3m read</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="cta-banner">
        <h2>The app for unfiltered voices</h2>
        <div className="cta-buttons">
          <button className="btn-primary">Get started</button>
          <button className="btn-outline">Learn more</button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="main-feed">
        {filteredPosts.map((post, idx) => (
          <div key={idx} className="post no-image">
            <p className="author">
              {post.author} <span className="date">| {post.date}</span>
            </p>
            <h3>{post.title}</h3>
            <p className="excerpt">{post.content.slice(0, 100)}...</p>
            <Link to={`/post/${post.id}`} className="read-more">
              Read More <span className="arrow">→</span>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;