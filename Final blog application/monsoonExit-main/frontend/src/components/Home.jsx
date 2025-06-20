import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
  };

  const handleUpdate = (blog) => {
    navigate("/add", { state: blog });
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center" sx={{ px: 4 }}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="180"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {blog.category}
                </Typography>
                <Typography variant="h6" component="div">
                  {blog.title}
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  paddingTop: 0,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(blog._id)}
                >
                  DELETE
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleUpdate(blog)}
                >
                  UPDATE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;