import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";

import "../Styles/News-details.css";

export default function NewsDetails() {
  const { slug } = useParams();

  const [news, setNews] = useState({});
  const [newslist, setNewsList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/news/${slug}`)
      .then(response => {
        setNews(response.data);
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.error("Error fetching news data:", error);
      });

    axios.get("http://localhost:3000/news")
      .then(response => {
        setNewsList(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching news data:", error);
      });
  }, [slug]);
  const recentNews = newslist.slice(0, 4);

  const imageUrl = news.nimage ? `http://localhost:3000/uploads/news/${news.nimage}` : '';

  
  // Convert the date string to a JavaScript Date object
  const parsedDate = new Date(news.date);

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = parsedDate.toLocaleString('default', { month: 'long' });
  const day = parsedDate.getDate(); 

  return (
    <Helmet title={news.title}>
      <section>
        <div className="container mx-auto py-32">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-1 justify-center py-20 pl-20">
            <div className="lg:col-span-2">
              <div className="news_details">
                <img src={imageUrl} alt="" className="w-full" />
                <h2 className="section__title mt-4 mb-4 font-bold text-2xl">{news.title}</h2>

                <div className="news_publisher flex items-center gap-1 mb-4">
                  <span className="text-gray-600 flex items-center gap-1 pr-6">
                    <i className="ri-user-line"><FaPenNib/></i> {news.writer}
                  </span>

                  <span className="news_date flex items-center gap-1">
                    <i className="ri-time-line"><MdDateRange/></i> {`${month} ${day}, ${year}`}
                  </span>
                </div>

                <p className="section__description">{news.content}</p>
                
              </div>
            </div>

            <div className="lg:col-span-1 ml-14 w-120">
              <div className="recent__post mb-4">
                <h5 className="font-bold">Recent News</h5>
              </div>
              {recentNews.map((item) => (
                <div className="recent__news-post mb-4" key={item.id}>
                  <div className="recent__news-item flex gap-3">
                    <img
                      src={`http://localhost:3000/uploads/news/${item.nimage}`}
                      alt=""
                      className="w-40 rounded-lg"
                    />
                    <h6 className="w-30">
                      <Link to={`/news/${item.title}`}>{item.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};
