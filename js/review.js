function handleSearch() {
    const searchTerm = document.getElementById("search").value;
    searchPokemon(searchTerm);
}

function searchPokemon(searchTerm) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .then(response => response.json())
    .then((data) =>  {
        const table = document.getElementById("table");
        table.innerHTML = "";
        table.appendChild(createTableTitles(data));
        table.appendChild(createLines(data));
    })
    .catch(error => {
        alert('Houve um erro na comunicação');
        console.error("Error:", error);
    })
    .finally(() => (document.getElementById("search").value = ""));
}

function createTableTitles(pokemon) {
    const head = document.createElement("thead");

    Object.keys(pokemon).map((key) => {
        const element = document.createElement("td");

        if (typeof pokemon[key] !== "object" && typeof pokemon[key] !== "array") {
            element.innerHTML = key;
            head.appendChild(element);
        } 
    })

    return head;
}

function createLines(pokemon) {
    const line = document.createElement("tr");
    Object.keys(pokemon).map((key) => {
        const element = document.createElement("td");

        if (typeof pokemon[key] !== "object" && typeof pokemon[key] !== "array") {
            element.innerHTML = pokemon[key];
            line.appendChild(element);
        } 
    })

    return document.createElement("tbody").appendChild(line);
}