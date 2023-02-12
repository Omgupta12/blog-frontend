const express = require("express");
const BlogModel = require("../model/blog.model");
const { default: mongoose } = require("mongoose");

const app = express.Router();


// <<<<<<<<<< POST BLOG ROUTE >>>>>>>>>>>
app.post("/post", async (req, res) => {
  const { title, description, image} = req.body;
 
  try {
    const blog = new BlogModel({ title, description,image });
    await blog.save();
    return res.status(201).send({message:"Blog Created Successfully"});
  } catch (e) {
    console.log("error", e.message);
    return res.status(400).send({ message: e.message });
  }
});

// <<<<<<<<<< GET ALL BLOG ROUTE >>>>>>>>>>>
app.get("/", async (req, res) => {
  try {
    const allblog = await BlogModel.find().sort({ date: -1 });
    return res.status(200).send(allblog);
  } catch (e) {
    console.log("error", e.message);
    return res.status(500).send({ message: e.message });
  }
});

// <<<<<<<<<< GET SINGLE BLOG ROUTE >>>>>>>>>>>
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogModel.findOne({ _id: id });
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.send(blog);
  } catch (e) {
    console.log("error", e.message);
    return res.status(500).send({ message: e.message });
  }
});

module.exports = app;
