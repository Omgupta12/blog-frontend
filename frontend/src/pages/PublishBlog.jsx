import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Center,
  useToast,
  Text,
  Input,
  Heading,
} from "@chakra-ui/react";
import { TbFileUpload } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PublishBlog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  //upload image
  async function fileUpload(e) {
    const formData = new FormData();
    const file = e.target.files[0];
    console.log(file);
    formData.append("file", file);
    formData.append("upload_preset", "myUploads");
    let res = await fetch(
      `https://api.cloudinary.com/v1_1/dym57v5kc/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    let data = await res.json();
    setImage(data.url);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", post.title);
    data.append("description", post.description);
    data.append("image", image);

    try {
      let res = await axios.post("https://blog-server-y0dh.onrender.com/blog/post", post);
      console.log(res);
      toast({
        title: "Blog Published.",
        description: "We've published your blog.",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      setPost({ title: "", description: "" });
      setImage("")
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong while publishing the blog.",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <Heading mb={"2rem"} textAlign={"center"}>
        PublishBlog
      </Heading>
      <Center>
        <form
          onSubmit={handleSubmit}
          style={{ margin: "auto", height: "50vh", width: "50vh" }}
        >
          <Input
            style={{ border: "1px solid black" }}
            type="text"
            placeholder="Enter Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <Input
            style={{ border: "1px solid black", height: "20vh" }}
            type="text"
            placeholder="Write Summary here "
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input type="file" onChange={fileUpload} />
          <br />
          <br />
          {/* <TbFileUpload
            type="submit"
            style={{ margin: "auto", cursor: "pointer" }}
            size={"2rem"}
          /> */}
          <Button type="submit">Add Blog</Button>
          <AiOutlineHome
            onClick={handleHome}
            size={"2rem"}
            style={{  cursor: "pointer" }}
          />
        </form>
      </Center>
    </>
  );
};

export default PublishBlog;
