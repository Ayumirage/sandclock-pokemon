import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import pokeballLogo from "./assets/pokeball.png";
import searchIcon from "./assets/searchIcon.png";
import sand from "./assets/sand.png";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);

  return (
    <div className="App">
      <div className="header">
        <div className="logoContainer">
          <img src={pokeballLogo} className="pokeballLogo" alt="" />
        </div>

        <div className="searchBar">
          <div className="searchIconContainer">
            <img src={searchIcon} />
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Enter pokemon name..."
                className="searchInput"
              />
            </label>
          </form>
        </div>
        <div className="logoContainer">
          <img src={sand} className="sandlogo" alt="" />
        </div>
      </div>

      {pokemonData.map((data) => {
        return (
          <div className="pokemonCard">
            <img src={data.sprites["front_default"]} />
            <hr></hr>
            <div className="details">
              <div className="name">
                <div className="">Type: {pokemonType}</div>
              </div>
              <div className="priceContainer">
                <div className="">Height: {Math.round(data.height * 3.9)}"</div>
              </div>
              <div className="priceContainer">
                <div className="">
                  Weight: {Math.round(data.weight / 4.3)} lbs
                </div>
              </div>
              <div className="priceContainer">
                <div className=""> Battles: {data.game_indices.length}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
