function createGet(url) { // TODO? Usar Fetch Api
    let request = new XMLHttpRequest(); 

    request.open("GET", url, false);
    request.send();

    return request.responseText;
}

function createLine(pokemon) {
    const line   = document.createElement("tr");
    const tdId   = document.createElement("td");
    const tdName = document.createElement("td");
    
    tdId.innerHTML   = pokemon.id;
    tdName.innerHTML = pokemon.name;

    line.appendChild(tdId);
    line.appendChild(tdName);

    return line;
}

async function searchPokemon() {

    const searchTerm  = document.getElementById("search").value.toLowerCase(); 
    const dataPokemon = await createGet(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    const pokemonInfo = JSON.parse(dataPokemon);
    const table       = document.getElementById("table");
    // table.innerHTML   = '';

    if (pokemonInfo) { //TODO? Tratar retorno da requisicao

        const line = createLine(pokemonInfo);
        table.appendChild(line);

    } else {
    }
}
