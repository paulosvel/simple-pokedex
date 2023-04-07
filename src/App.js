import { Box, Button } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material";

function App() {
  const [pokemon, setPokemon] = useState([]);
  async function getPikachu() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    setPokemon(response.data.results);
    console.log(response.data.results);
  }
  useEffect(() => {
    getPikachu();
  });

  return (
    <>
      {pokemon &&
        pokemon.map((item, i) => {
          return (
            
            <>
              <Box>{item.name}</Box>

              <Box>
                {" "}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}
                ></img>
              </Box>
            </>
          );
        })}
    </>
  );
}

export default App;
