"use client";
import React, { useEffect, useState } from 'react';
import './globals.css'; 
import { useRouter } from 'next/navigation';
import { Parent } from '../components/Home';


const Page = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkipNumber] = useState(1);
  const [search, setSearch] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(`https://dev.to/api/articles?per_page=9&page=${skip}`)
      const data = await response.json();
      setArticles(data);
      setLoading(false)
      console.log(data)
    }

    fetchArticles();
  }, [skip])

  const addSkipCount = () => {
    setSkipNumber((prevSkip) => prevSkip + 1); 
  };
  
  const minusSkipcount = () => {
    const sigma = skip - 1;
    setSkipNumber(sigma);
  };

  const redirect = (id) => {
   router.push(String(id)); 
  }

  if (loading) {
    return <div className="loading">Loading, wait beo</div>
  };
  
  const someSearchChange = (event) => {
    setSearch(event.target.value);};

  const filteredArticles = articles.filter((articles) => {
    const low =  articles.title.toLowerCase()
     const low2 = search.toLowerCase()
     return low.includes(low2)
  })
   
  return (
    <Parent>
    <div className="page-container">
   
      <input type="text" placeholder="Search something" value={search} onChange={someSearchChange} className='input'/>
      <h1 className="page-title">Articles</h1>
      {filteredArticles.map((article) => (
        <div key={article.id} className="article-card">
          {article.cover_image && (
            <img className="article-image" onClick={() => redirect(article.id)} src={article.cover_image} alt={article.title} />
          )}
          <p className='user-tags'>{article.tags}</p>
          <h2 className="article-title">{article.title}</h2>
          <p className="article-description">{article.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={article.user.profile_image} className='user-profile'/>
            <p className='user-name'>{article.user.name}</p>
            <p className='user-date'>{article.readable_publish_date}</p>
          </div>
        </div>
      ))}
      <button onClick={minusSkipcount} className='prev-button'>Previous</button>
      <div style={{ marginLeft: "300px" }}>{skip}</div>
      <button onClick={addSkipCount} className='next-button'>Next</button>
    </div>
     </Parent>);
};
export default Page;
