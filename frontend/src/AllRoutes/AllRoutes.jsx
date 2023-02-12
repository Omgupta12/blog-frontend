import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BlogPost from "../pages/BlogPost";
import PublishBlog from "../pages/PublishBlog";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<BlogPost/>} />
        <Route path="/publishpost" element={<PublishBlog/>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
