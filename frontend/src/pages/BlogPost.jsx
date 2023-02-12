import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const BlogPost = () => {
  const navigate = useNavigate();
  const [one_blog, setOneBlog] = useState({});
  const { id } = useParams();
  // console.log(id);

  const getblog = async () => {
    let res = await axios.get(`https://blog-server-y0dh.onrender.com/blog/${id}`);
    // console.log("res", res.data);
    setOneBlog(res.data);
  };

  useEffect(() => {
    getblog();
  }, []);

  const handleHome = () => {
    navigate("/");
  };

  // console.log(one_blog)

  return (
    <>
      <AiOutlineHome
        onClick={handleHome}
        size={"2rem"}
        style={{ margin: "auto", cursor: "pointer" }}
      />
      <div className="single_blog">
        <div style={{ fontSize: "2rem" }}> {one_blog.title}</div>
        <div> {one_blog.description}</div>
      </div>
    </>
  );
};

export default BlogPost;
