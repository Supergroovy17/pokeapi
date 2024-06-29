async function fetchData(cardNumber) {
  try {
    const pokemonName = document.getElementById(`pokemonName${cardNumber}`).value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById(`pokemonSprite${cardNumber}`);
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

    // // Fetch Pokémon species data to get the description
    // const speciesResponse = await fetch(data.species.url);
    // if (!speciesResponse.ok) {
    //   throw new Error("Could not fetch species data");
    // }

    // const speciesData = await speciesResponse.json();
    // // const pokemonDesc = speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;

    // Fetch Pokémon moves
    let movesList = "";
    for (let i = 0; i < 4; i++) { // Displaying only the first 4 moves
      if (data.moves[i]) {
        movesList += `<li>${data.moves[i].move.name}</li>`;
      }
    }
    document.getElementById(`pokemon-moves${cardNumber}`).innerHTML = movesList;

    // Update types
    let typesDiv = document.getElementById(`pokemon-types${cardNumber}`);
    while (typesDiv.firstChild) {
      typesDiv.firstChild.remove();
    }
    let types = data.types;
    for (let i = 0; i < types.length; i++) {
      let type = document.createElement("span");
      type.innerText = types[i].type.name.toUpperCase();
      type.classList.add("type-box");
      type.classList.add(types[i].type.name); // adds background color and font color
      typesDiv.append(type);
    }

  //   // Update description
  //   document.getElementById(`pokemon-description${cardNumber}`).innerText = pokemonDesc;
   } catch (error) {
     console.error(error);
   }
}

// Function to play cry sound on button click
async function playPokemonCry(cardNumber) {
  try {
    const pokemonName = document.getElementById(`pokemonName${cardNumber}`).value.toLowerCase();
    const cryResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    if (!cryResponse.ok) {
      throw new Error("Could not fetch cry data");
    }
    const cryData = await cryResponse.json();
    const pokemonCry = cryData.cries.latest;

    const audioElement = document.getElementById("pokemonCry");
    audioElement.src = pokemonCry;
    audioElement.play();
  } catch (error) {
    console.error(error);
  }
}
