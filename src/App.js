import { Box, Button } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material";
import { Pagination } from "@mui/material";
import ReactPaginate from "react-paginate";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(10);

  async function getPokemons() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000");
    setPokemon(response.data.results);
    console.log(response.data.results);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <>
      {currentPokemon &&
        currentPokemon.map((item) => {
          const pokemonId = item.url.split("/")[6];
          return (
            <>
              <Box key={item.name}>{item.name}</Box>

              <Box>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                ></img>
              </Box>
            </>
          );
        })}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Box sx={{ width: "20px" }}></Box>
        <Button
          variant="contained"
          disabled={currentPokemon.length < pokemonPerPage}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default App;
