import { Box, Button, TextField } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from "@mui/material";
import { Pagination } from "@mui/material";
import ReactPaginate from "react-paginate";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(25);

  async function getPokemons() {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );
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

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handleChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
    <Box sx={{display: "flex", justifyContent: "center", paddingBottom:"10px", paddingTop:"10px"}}>
      <TextField
        placeholder="Search"
        sx={{  width:"20%"}}
        value={search}
        onChange={handleChange}
      />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {currentPokemon &&
          currentPokemon.map((item) => {
            const pokemonId = item.url.split("/")[6];
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    ></img>
                  </Box>
                  <Box
                    sx={{ fontFamily: "Cursive", fontWeight: "500" }}
                    key={item.name}
                  >
                    {item.name}
                  </Box>
                </Box>
              </>
            );
          })}{" "}
        {/*mapping end */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Button
          sx={{ width: "100px" }}
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Box sx={{ width: "10px" }}></Box>
        <Button
          sx={{ width: "100px" }}
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
