import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TiDocumentAdd } from "react-icons/ti";

import "./Home.css";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const getblog = async () => {
    let res = await axios.get("https://blog-server-y0dh.onrender.com/blog");
    // console.log("res", res.data);
    setBlog(res.data);
  };

  useEffect(() => {
    getblog();
  }, []);

  const handlePost = () => {
    navigate("/publishpost");
  };
  return (
    <>
      <h1
        style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}
      >
        Eqaim Blog
      </h1>
      <div className="home_blog">
        {blog.map((el) => (
          <div key={el._id}>
            <div className="single_blog">
              <Link to={`/${el._id}`}>
                <div>
                  <h1 style={{ fontSize: "2rem" }}>{el.title}</h1>
                </div>
                <div>{el.description}</div>
              </Link>
            </div>
          </div>
        ))}
        <TiDocumentAdd
          size={"2rem"}
          onClick={handlePost}
          style={{ margin: "auto", cursor: "pointer" }}
        />
      </div>
    </>
  );
};

export default Home;
