const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const image = document.getElementById("image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const cleanInput = (nameOrId) => {
  const regex = /[^\w\s]/gi;
  const spaces = /\s+/gi;
  const cleanName = nameOrId.toLowerCase();
  cleanName.replace(regex, "").replace(spaces, "-");
  return cleanName;
};

const getPokemon = (nameOrId) => {
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`)
    .then((res) => res.json())
    .then((data) => getPokemonStats(data));
};

const getPokemonStats = (arr) => {
  console.log(arr);
  pokemonName.textContent = arr.name.toUpperCase();
  pokemonId.textContent = "#" + arr.id;
  weight.textContent = "Weight: " + arr.weight + ". ";
  height.textContent = "Height: " + arr.height + ".";
  image.innerHTML = `<img id="sprite" src="${arr.sprites.front_default}" />`;
  arr.types.forEach((type) => {
    types.innerHTML += `<span class="type ${type.type.name}">${type.type.name}</span>`;
  });
  hp.textContent = arr.stats[0].base_stat;
  attack.textContent = arr.stats[1].base_stat;
  defense.textContent = arr.stats[2].base_stat;
  specialAttack.textContent = arr.stats[3].base_stat;
  specialDefense.textContent = arr.stats[4].base_stat;
  speed.textContent = arr.stats[5].base_stat;
  console.log(arr.sprites.front_default);
};

const getInput = () => {
  if (searchInput.value === "Red") {
    alert("Pokémon not found");
  } else {
    const input = cleanInput(searchInput.value);
    getPokemon(input);
  }
};

btnSearch.addEventListener("click", getInput);
