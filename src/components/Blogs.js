import React from 'react';
import '../styles/Blogs.css';

const blogs = [
  {
    title: 'Top 5 Emergency Pharmacies in Ahmedabad',
    description:
      'Discover the most reliable late-night pharmacies across key areas of Ahmedabad. All open beyond midnight!'
  },
  {
    title: 'How NyteHawk Helps Late-Night Travelers',
    description:
      "NyteHawk connects users with nearby open services after hours. Learn how it's making night travel safer and smarter."
  },
];

const MiniBlogCards = () => {
  return (
    <div className="mini-blog-section">
      <h2 className="section-title">📰 Nightly Highlights</h2>
      <div className="blog-card-container">
        {blogs.map((blog, idx) => (
          <div className="blog-card" key={idx}>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-desc">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBlogCards;
