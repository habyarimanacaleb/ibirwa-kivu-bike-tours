const express = require("express");
const cors = require("cors");
const app = express();

// Add CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
