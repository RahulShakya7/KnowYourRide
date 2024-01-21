import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NewsList() {
  const [news, setNewsList] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:3000/news")
      .then(response => {
        setNewsList(response.data.data); 
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 justify-center pb-12">
      {news.map((item) => (
        <NewsItem news={item} key={item.id} />
      ))}
    </div>
  );
};

const NewsItem = ({ news }) => { 
  const { title, nimage, content, date, id, writer } = news;

  const imageUrl = `http://localhost:3000/uploads/news/${nimage}`;

  const parsedDate = new Date(date);

  // Extract date components
  const year = parsedDate.getFullYear();
  const month = parsedDate.toLocaleString('default', { month: 'long' });
  const day = parsedDate.getDate(); 

  return (
    <div className="rounded p-4 shadow-md">
      <div className="h-3/5 mb-4">
        <img src={imageUrl} alt="" className="w-full h-full object-cover"/>
      </div>
      <Link to={`/news/${id}`} className="text-xl font-semibold">
        {title}
      </Link>
      <p className=" mt-3">
        {content.length > 100 ? content.substr(0, 100) : content}
      </p>

      <Link to={`/news/${id}`} className="block mt-4 py-5 text-blue-500 hover:underline">
        Read More
      </Link>

      <hr/>

      <div className="flex items-center justify-between mt-3">
        <span className="text-gray-600 flex items-center gap-1">
          <i className="ri-user-line"><FaPenNib/></i> {writer}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-gray-600 flex items-center gap-1">
            <i className="ri-time-line"><MdDateRange/></i> {`${month} ${day}, ${year}`} 
          </span>
        </div>
      </div>
    </div>
  );
};
