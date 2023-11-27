window.onload = function() {
    loadPokemons();
    setupPokeballDrag();
}

function loadPokemons() {
    const pokemons = getPokemonsFromLocalStorage();
    pokemons.forEach(appendPokemonToRow);
}

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search").value.toLowerCase();
    searchPokemon(searchTerm);
}

function searchPokemon(searchTerm) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => response.json())
        .then(addPokemonToRowAndLocalStorage)
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
    const pokemons = [...getPokemonsFromLocalStorage(), pokemon];
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

function showError(error) {
    alert('Houve um erro na comunicação');
    console.error("Error:", error);
}

function clearSearch() {
    document.getElementById("search").value = "";
}

function setupPokeballDrag() {
    const pokeball = document.getElementById("iconPoke").firstElementChild;
    pokeball.draggable = true;
    pokeball.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    });
}

function createCard(pokemon) {
    const card = createElement("div", { className: "card", id: pokemon.id });
    const img = createElement("img", { src: pokemon.sprites.front_default, alt: pokemon.name });
    const heightCard = createElement("div", { className: "heightCard" });
    const cardDetails = createCardDetails(pokemon);
    const overlay = createPokemonDetailsOverlay(pokemon);
    const removeButton = createRemoveButton(pokemon, card);

    heightCard.appendChild(cardDetails);
    card.append(img, heightCard, overlay, removeButton);

    card.addEventListener('click', toggleOverlayDisplay.bind(null, overlay));
    setupCardDrop(card);

    return card;
}

function setupCardDrop(card) {
    card.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    card.addEventListener("drop", function(event) {
        event.preventDefault();
        const pokemonId = event.dataTransfer.getData("text");
        if (pokemonId) {
            removeCardAndPokemonFromLocalStorage(card, { id: pokemonId });
        }
    });
}

function createElement(tag, attributes) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    return element;
}

function createCardDetails({ name, id }) {
    const cardDetails = createElement("div", { className: "cardDetails" });
    const nameElement = createElement("p", { className: "name", innerHTML: name });
    const number = createElement("p", { innerHTML: `#${id}` });

    cardDetails.append(nameElement, number);

    return cardDetails;
}

function createRemoveButton(pokemon, card) {
    const removeButton = createElement("button", { className: "close-button", innerHTML: "x" });
    removeButton.onclick = removeCardAndPokemonFromLocalStorage.bind(null, card, pokemon);
    return removeButton;
}

function removeCardAndPokemonFromLocalStorage(card, { id }) {
    card.parentNode.removeChild(card);
    const pokemons = getPokemonsFromLocalStorage().filter(p => p.id !== id);
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

function createPokemonDetailsOverlay({ height, weight, abilities }) {
    const overlay = createElement("div", { className: "pokemon-details-overlay" });
    overlay.style.display = "none";
    const heightElement = createElement("p", { innerHTML: `Altura: <br>${height}` });
    const weightElement = createElement("p", { innerHTML: `Peso: <br>${weight}` });
    const ability = createElement("p", { innerHTML: `Habilidade: <br>${abilities[0].ability.name}` });

    overlay.append(heightElement, weightElement, ability);

    return overlay;
}

function toggleOverlayDisplay(overlay) {
    overlay.style.display = overlay.style.display === "none" ? "block" : "none";
    event.stopPropagation();
}