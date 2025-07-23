import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});     

app.get("/login", (req, res) => {
  res.send("Login");
});

app.get("/signup", (req, res) => {
  res.send("Signup");
});

app.get("/purchase/:id", (req, res) => {
  res.send(`Purchase ${req.params.id}`);
});

app.get("/allcourses", (req, res) => {
  res.send("All Courses");
});

app.get("/purchasedcourse", (req, res) => {
  res.send("Purchased Course");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


