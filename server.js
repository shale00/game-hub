// server.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors()); // Allow all origins

// Proxy route to forward requests to the external API
app.get("/api/data", async (req, res) => {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.RAWG_API_KEY;

    // Forward the request to the external API
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: apiKey,
      },
    });

    // Return the data received from the external API to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
