import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pilots, setPilots] = useState([]);

  const getAllStarships = async (url) => {
    setLoading(true);

    try {
      const response = await axios.get(url);
      const newStarships = [...starships, ...response.data.results];

      if (response.data.next) {
        getAllStarships(response.data.next);
      } else {
        setStarships(newStarships);
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getAllPeople = async () => {
    const results = [];
    try {
      for (let i = 1; i < 10; i++) {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${i}`
        );
        results.push = [...response.data.results];
      }
    } catch (err) {
      console.log(err.message);
    }
    setPilots(results);
  };

  useEffect(() => {
    getAllStarships("https://swapi.dev/api/starships/");
    getAllPeople();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Starships</th>
            <th>Pilots</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((starship) => (
            <tr key={starship.name}>
              <td>{starship.name}</td>
              <td>
                {pilots
                  .filter((pilot) => pilot.starships.includes(starship.url))
                  .map((pilot) => (
                    <span key={pilot.name}>{pilot.name}, </span>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Starships;
