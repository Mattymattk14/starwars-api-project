import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [pilots, setPilots] = useState([]);

  const getAllStarships = async () => {
    const results = [];

    try {
      for (let i = 1; i < 5; i++) {
        const response = await axios.get(
          `https://swapi.dev/api/starships/?page=${i}`
        );
        results.push(...response.data.results);
        console.log("ships", response.data.results);
      }
    } catch (err) {
      console.log(err.message);
    }
    setStarships(results);
  };

  const getAllPeople = async () => {
    const results = [];

    try {
      for (let i = 1; i < 10; i++) {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${i}`
        );
        results.push(...response.data.results);
      }
    } catch (err) {}
    setPilots(results);
  };

  useEffect(() => {
    getAllStarships();
    getAllPeople();
  }, []);

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
