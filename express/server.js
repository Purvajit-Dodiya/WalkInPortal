const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/api"); // Import your routes

app.use(express.json());
app.use(cors()); // Use your routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
