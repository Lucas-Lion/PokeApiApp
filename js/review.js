window.onload = loadPokemons;

function loadPokemons() {
    const pokemons = getPokemonsFromLocalStorage();
    pokemons.forEach(pokemon => appendPokemonToRow(pokemon));
}

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search").value;
    searchPokemon(searchTerm);
}

function searchPokemon(searchTerm) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => response.json())
        .then(data => addPokemonToRowAndLocalStorage(data))
        .catch(showError)
        .finally(clearSearch);
}

function addPokemonToRowAndLocalStorage(pokemon) {
    appendPokemonToRow(pokemon);
    addPokemonToLocalStorage(pokemon);
}

function appendPokemonToRow(pokemon) {
    const row = document.getElementById("row");
    row.appendChild(createCard(pokemon));
}

function getPokemonsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pokemons')) || [];
}

function addPokemonToLocalStorage(pokemon) {
    const pokemons = getPokemonsFromLocalStorage();
    pokemons.push(pokemon);
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

function showError(error) {
    alert('Houve um erro na comunicação');
    console.error("Error:", error);
}

function clearSearch() {
    document.getElementById("search").value = "";
}

function createCard(pokemon) {
    const card = createPokemonCard(pokemon);
    const removeButton = createRemoveButton(pokemon, card);
    card.appendChild(removeButton);
    return card;
}

function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    card.appendChild(img);

    const teste = document.createElement("div");
    teste.className = "teste";

    const cardDetails = createCardDetails(pokemon);
    teste.appendChild(cardDetails);
    card.appendChild(teste);

    return card;
}

function createCardDetails(pokemon) {
    const cardDetails = document.createElement("div");
    cardDetails.className = "cardDetails";

    const name = document.createElement("p");
    name.className = "name";
    name.innerHTML = pokemon.name;
    cardDetails.appendChild(name);

    const number = document.createElement("p");
    number.innerHTML = `#${pokemon.id}`;
    cardDetails.appendChild(number);

    return cardDetails;
}

function createRemoveButton(pokemon, card) {
    const removeButton = document.createElement("button");
    removeButton.className = "close-button";
    removeButton.innerHTML = "x";
    removeButton.onclick = function() {
        removeCardAndPokemonFromLocalStorage(card, pokemon);
    };
    return removeButton;
}

function removeCardAndPokemonFromLocalStorage(card, pokemon) {
    card.parentNode.removeChild(card);
    const pokemons = getPokemonsFromLocalStorage();
    const index = pokemons.findIndex(p => p.id === pokemon.id);
    pokemons.splice(index, 1);
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}