import { Box, Button } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
async function getPikachu(){
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')
    setPokemon(response);
    console.log(response);
  }-
  useEffect (() => {
  getPikachu();
  }
  );
  const [pokemon, setPokemon] = useState([]);



  return (
    <>
      {pokemon&&
      pokemon.map((item)=>{
        item.data.map((item)=>{
          return(
            <Box>
              {item.name}
            </Box>
          )
        })
      })}
    </>
  );

}

export default App;
