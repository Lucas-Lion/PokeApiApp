function handleSearch() {
    const searchTerm = document.getElementById("search").value;
    searchPokemon(searchTerm);
}

function searchPokemon(searchTerm) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then(response => response.json())
    .then((data) =>  {
        const table = document.getElementById("table");
        table.appendChild(createLine(data));
    })
    .catch(error => {
        alert('Houve um erro na comunicação');
        console.error("Error:", error);
    })
    .finally(() => (document.getElementById("search").value = ""));
}

function createLine(pokemon) {
    const line   = document.createElement("tr");
    const tdId   = document.createElement("td");
    const tdImg   = document.createElement("td");
    const img   = document.createElement("img");
    const tdName = document.createElement("td");
    
    tdId.innerHTML   = pokemon.id;
    img.src = pokemon.sprites.back_default;
    img.alt = pokemon.name;
    tdImg.appendChild(img);
    tdName.innerHTML = pokemon.name;

    line.appendChild(tdId);
    line.appendChild(tdImg);
    line.appendChild(tdName);

    return line;
}
