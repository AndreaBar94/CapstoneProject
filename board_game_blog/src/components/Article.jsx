import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Article = () => {
  const { articleId } = useParams();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const article = articles.content.find((article) => article.articleId === articleId);
console.log(article);
  return (
    <div>
      <h1>Title: {article && article.title}</h1>
      <p>Content: {article && article.content}</p>
      <p>Author: {article && article.user.username}</p>
      <p>Date: {article && article.publicationDate}</p>
    </div>
  );
};

export default Article;
