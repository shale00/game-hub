import express from 'express';
import dotenv from 'dotenv';
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors()); // Allow all origins

const fetchDataFromApi = async (endpoint: string, params: any) => {
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
app.get(
  "/api/games",
  async (
    req: { query: any },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): void; new (): any };
      };
    }
  ) => {
    try {
      // Fetch games data
      const gamesData = await fetchDataFromApi("games", req.query);

      // Return the data received
      res.json(gamesData);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
);

// Fetch Genres Route
app.get(
  "/api/genres",
  async (
    req: { query: any },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): void; new (): any };
      };
    }
  ) => {
    try {
      // Fetch genres data
      const genresData = await fetchDataFromApi("genres", req.query);

      // Return the data received
      res.json(genresData);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
);

// Fetch Platforms Route
app.get(
  "/api/platforms/lists/parents",
  async (
    req: { query: any },
    res: {
      json: (arg0: any) => void;
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { error: any }): void; new (): any };
      };
    }
  ) => {
    try {
      // Fetch platforms data
      const platformsData = await fetchDataFromApi(
        "platforms/lists/parents",
        req.query
      );

      // Return the data received
      res.json(platformsData);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
