import { useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<FetchGamesResponse>("http://localhost:3001/api/data")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err));
  }, []);

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  );
};

export default GameGrid;
