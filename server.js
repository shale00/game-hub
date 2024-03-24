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

const fetchDataFromApi = async (endpoint) => {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.RAWG_API_KEY;

    // Forward the request to the external API
    const response = await axios.get(`https://api.rawg.io/api/${endpoint}`, {
      params: {
        key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data from external API for ${endpoint}`,
      error
    );
    throw new Error("Internal server error");
  }
};

// Fetch Games Route
app.get("/api/games", async (req, res) => {
  try {
    // Fetch games data
    const gamesData = await fetchDataFromApi("games");

    // Return the data received
    res.json(gamesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Genres Route
app.get("/api/genres", async (req, res) => {
  try {
    // Fetch genres data
    const genresData = await fetchDataFromApi("genres");

    // Return the data received
    res.json(genresData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
