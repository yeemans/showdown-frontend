async function getPokemonData(pokemon) {
    // get data for pokemon from api
    pokemon = pokemon.replaceAll(" ", "-").toLowerCase(); // replace spaces with dashes
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`.toLowerCase();
    let response = await fetch(url);
    let data = await response.json()

    return data;
}

async function fillInFields(props) { 
    let info = props["pokemonInfo"];
    let imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"

    // ping api for possible moves of the pokemon first
    let data = await getPokemonData(info.pokemon)
    console.log(data)
    let moves = await(props.getPossibleMoves(data))
    console.log(moves);
    console.log(info.abiltiies)

    let hash = {"pokemon": info.pokemon, "image": info.image, "ability": info.ability, 
    "item": info.item, "abilities": info.abilities, "itemImage": imageURL + info.item + ".png", 
    "moves": moves, "moveSet": info.moveSet, "evs": info.evs};
    
    document.getElementById("speciesInput").value = hash["pokemon"];
    document.getElementById("itemInput").value = hash["item"];
    document.getElementById("abilityInput").value = hash["ability"];
    document.getElementById("itemImage").src = hash["itemImage"];
    document.getElementById("pokemonImage").src = hash["image"];

    // display the moves in input boxes 
    clearMoves();
    displayMoves(props["moveSet"]);
    props.autoFill(hash);
    props.setIsEditing(true);
    props.setTeamIndex(props.teamIndex);
}

function displayMoves(moves) { 
    console.log(moves);
    let inputs = ["One", "Two", "Three", "Four"];
    for (let i = 0; i < moves.length; i++) { 
        if (moves[i] !== "" && moves[i] !== undefined)
            document.getElementById(`move${inputs[i]}`).value = moves[i]; 
        else 
            // make the move blank if pokemon has < 4 moves
            document.getElementById(`move${inputs[i]}`).value = ""; 
    }
}
 
function clearMoves() {
    for (let id of ["One", "Two", "Three", "Four"])
        document.getElementById(`move${id}`).value ="";
}


function FighterBox(props) { 
    return( 
        <div className="columns is-one-sixth"> 
            <div onClick={() => fillInFields(props)}> 
                <img className="headerImage" src={props["pokemonInfo"]["image"]} 
                    alt={props["pokemonInfo"]["pokemon"]}/>

            </div>
        </div>

    )
}

export default FighterBox;