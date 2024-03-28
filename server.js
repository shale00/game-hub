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

const fetchDataFromApi = async (endpoint, params) => {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.RAWG_API_KEY;

    const url = `https://api.rawg.io/api/${endpoint}`;

    const queryParams = {
      key: apiKey,
      ...params,
    };

    // Forward the request to the external API
    const response = await axios.get(url, {
      params: queryParams,
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
    const gamesData = await fetchDataFromApi("games", req.query);

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

// Fetch Platforms Route
app.get("/api/platforms/lists/parents", async (req, res) => {
  try {
    // Fetch platforms data
    const platformsData = await fetchDataFromApi("platforms/lists/parents");

    // Return the data received
    res.json(platformsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
