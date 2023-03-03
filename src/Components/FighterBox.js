function fillInFields(props) { 
    let info = props["pokemonInfo"];
    let imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"

    let hash = {"pokemon": info.pokemon, "image": info.image, "ability": info.ability, 
    "item": info.item, "abilities": info.abilities, "itemImage": imageURL + info.item + ".png", 
    "moves": info.moves, "moveSet": info.moveSet, "evs": info.evs};
    
    document.getElementById("speciesInput").value = hash["pokemon"];
    document.getElementById("itemInput").value = hash["item"];
    document.getElementById("abilityInput").value = hash["ability"];
    document.getElementById("itemImage").src = hash["itemImage"];
    document.getElementById("pokemonImage").src = hash["image"];

    // display the moves in input boxes 
    displayMoves(hash["moveSet"]);

    console.log(hash);
    console.log(props);
    props.autoFill(hash);
}

function displayMoves(moves) { 
    let inputs = ["One", "Two", "Three", "Four"];
    console.log(moves);
    for (let i = 0; i < moves.length; i++) { 
        if (moves[i] !== "" && moves[i] !== undefined) {
            document.getElementById(`move${inputs[i]}`).value = moves[i]; 
        }
    }
}

function FighterBox(props) { 
    return( 
        <div className="columns is-one-sixth"> 
            <div onClick={() => fillInFields(props)}> 
                <img className="headerImage" src={props["pokemonInfo"]["image"]} 
                    alt={props["pokemonInfo"]["pokemon"]}/>
                <p>{props["pokemonInfo"]["pokemon"]}</p>
              
            </div>
        </div>

    )
}

export default FighterBox;