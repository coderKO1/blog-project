import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/category.css';
import Footer from "../components/Footer";
const API_KEY = '20cb773b991a45e4854f68a115bea611';

// Map your custom categories to NewsAPI valid ones
const categoryMap = {
  "New Bestsellers": "general",
  "Culture": "entertainment",
  "Technology": "technology",
  "Business": "business",
  "U.S. Politics": "general",
  "World Politics": "general",
  "Politics": "general",
  "Finance": "business",
  "Health": "health",
  "Food & Drink": "health",
  "Sports": "sports",
  "Art & Illustration": "entertainment"
};

const mockLeaderboard = [
  {
    id: 1,
    name: 'Terry Moran',
    description: 'Terry Moran',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Dr Stacey Patton',
    description: 'Dr Stacey Patton',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'MacFan Stevenson',
    description: 'MacFan',
    image: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    id: 4,
    name: 'Grounded Podcast',
    description: 'Grounded Podcast Substack',
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 5,
    name: 'Colin Matthews',
    description: 'Tech For Product',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  }
];

function CategoryPage() {
  const { categoryName } = useParams();
  const [leaders, setLeaders] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const mappedCategory = categoryMap[categoryName] || 'general';

      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: mappedCategory,
            country: 'us',
            pageSize: 10,
            apiKey: API_KEY
          }
        });

        const articles = response.data.articles.map((a, idx) => ({
          id: idx,
          author: a.author || 'Anonymous',
          handle: new URL(a.url).hostname,
          time: new Date(a.publishedAt).toLocaleDateString(),
          content: a.title,
        }));

        setPosts(articles);
        setLeaders(mockLeaderboard);
        setError('');
      } catch (err) {
        setError('Unable to load news right now.');
        console.error(err);
      }
    };

    fetchNews();
  }, [categoryName]);

  return (
    <div className="category-container">
      <h2 className="category-title">Trending in {categoryName}</h2>

      <ul className="leaderboard">
        {leaders.map((leader, index) => (
          <li key={leader.id} className="leaderboard-item">
            <span className="rank">{index + 1}</span>
            <img src={leader.image} alt={leader.name} className="avatar" />
            <div className="info">
              <strong>{leader.name}</strong>
              <p>{leader.description}</p>
            </div>
            <button className="follow-btn">+</button>
          </li>
        ))}
      </ul>

      <div className="post-feed">
        {error && <p className="error-message">{error}</p>}

        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <strong>{post.author}</strong>
              <span>{post.time}</span>
            </div>
            <p>{post.content}</p>
            <div className="post-footer">
              <span>{post.handle}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
}

export default CategoryPage;
