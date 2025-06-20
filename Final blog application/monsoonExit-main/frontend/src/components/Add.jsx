import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // check if editing an existing blog
  const existingBlog = location.state;

  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    image: "",
  });

  // Prefill if editing
  useEffect(() => {
    if (existingBlog) {
      setInputs({
        title: existingBlog.title,
        category: existingBlog.category,
        image: existingBlog.image,
      });
    }
  }, [existingBlog]);

  // Handle input change
  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      if (existingBlog) {
        // update existing blog
        await axios.put(`http://localhost:5000/api/blogs/${existingBlog._id}`, inputs);
        alert("Blog updated!");
      } else {
        // create new blog
        await axios.post("http://localhost:5000/api/blogs", inputs);
        alert("Blog added!");
      }
      navigate("/");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          onChange={inputHandler}
          name="title"
          value={inputs.title}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Category"
          onChange={inputHandler}
          name="category"
          value={inputs.category}
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          onChange={inputHandler}
          name="image"
          value={inputs.image}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          {existingBlog ? "Update Blog" : "Submit Blog"}
        </Button>
      </Box>
    </Box>
  );
};

export default Add;