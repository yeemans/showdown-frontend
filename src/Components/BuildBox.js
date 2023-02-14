import { useState, useEffect } from "react";
import ErrorList from "./ErrorList"

function BuildBox() { 
    const [pokemonImage, setPokemonImage] = useState('logo192.png'); 
    const [itemImage, setItemImage] = useState('logo192.png');

    const [abilities, setAbilities] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [moves, setMoves] = useState(new Set());

    const [items, setItems] = useState(["data"]);

    useEffect(() => {
        const fetchItems = async () => {
            let item_names = []
            let response = await fetch("items.json");
            const json = await response.json();
    
            for (let item of json[0]["items"])
                item_names.push(item['name'])
    
            console.log(item_names);
            setItems(item_names);
          }

          fetchItems();
      }, []);

    async function getPokemonImage(id) { 
        let input = sanitize_text(document.getElementById(id).value);
        let url = `https://pokeapi.co/api/v2/pokemon/${input}`.toLowerCase();
        try {
            let response = await fetch(url);
            let data = await response.json();
            await clearFields();
            await updateAbilities(data);
            await console.log(data);
            await setPokemonImage(data["sprites"]["front_default"])
            await getPossibleMoves(data);

            setErrorMessages([]);
        } catch {
            addError("Enter a valid Pokemon name");
            setPokemonImage("logo192.png");
        }

    }

    async function getItemImage(id) {
        let input = document.getElementById(id);
        let url = sanitize_text(`https://pokeapi.co/api/v2/item/${input.value}`);
        let response = await fetch(url);

        let data = await response.json();
        await console.log(data);
        await setItemImage(data["sprites"]["default"]); 
    }

    async function getPossibleMoves(data) {
        let possibleMoves = new Set()
        for (let move of data["moves"]) {
            possibleMoves.add(move["move"]["name"]);
        }

        setMoves(possibleMoves);
    }

    async function updateAbilities(data) {
        let pokemonAbilities = [];
        for (let ability of data["abilities"])
            pokemonAbilities.push(ability["ability"]["name"]);
        
        await console.log(pokemonAbilities)
        await setAbilities(pokemonAbilities);
    }

    function validateHasPokemon() {
        if (pokemonImage === "logo192.png") {
            addError("Choose a valid Pokemon first.");
            return false;
        }
        return true;
    }

    function validateHasMove(id) {
        if (!validateHasPokemon()) {
            addError("Choose a valid Pokemon first.");
            return;
        }

        let move = sanitize_text(document.getElementById("move" + id).value);
        if (moves.has(move) || move === "") {
            deleteError(`Pokemon does not have move ${id}`);
            return;
        }
        addError(`Pokemon does not have move ${id}`);
    }

    function sanitize_text(text) {
        return text.replaceAll(" ", "-").toLowerCase();
    }

    async function clearFields() {
        let itemInput = document.getElementById("itemInput")
        itemInput.value = "bright-powder";
        await getItemImage("itemInput");
        await setAbilities([])
        await setErrorMessages([]);
    }

    function addError(error) {
        let copy = [...errorMessages];
        if (!(copy.includes(error))) copy.push(error);
        setErrorMessages(copy);
    }

    function deleteError(error) {
        let copy = [];
        for (let e of errorMessages) {
            if (e !== error) copy.push(e)
        }
        setErrorMessages(copy);
    }

    return(
        <div className="columns">
            <div id="species" className="column is-one-quarter">
                <img className="pokemonImage" src={pokemonImage} alt="pokemon" />
                <label htmlFor="speciesInput">Species</label>
                <input type="text" id="speciesInput" 
                    onBlur={() => getPokemonImage("speciesInput")}>

                </input>
            </div>

            <div id="item" className="column is-one-quarter flex">
                <div className="floatDownBox">
                    <img className="itemImage" src={itemImage} alt="pokemon" id="itemImage"/>
                    <label htmlFor="itemInput">Item</label>

                    <select id="itemInput" onChange={() => getItemImage("itemInput")}>
                        {
                            items.map(item => {
                                return (<option key={item} value={item}>{item}</option>);
                        })}
                    </select>

                </div>
            </div>

            <div id="item" className="column is-one-quarter flex">
                <div className="floatDownBox">
                    <label id="abilityLabel" htmlFor="abilityInput">Ability</label>
                    {
                        <select>
                            {
                                abilities.map(item => {
                                    return (<option key={item} value={item}>{item}</option>);
                            })}
                        </select>
                    }

                </div>
            </div>

            <div id="moves" className="column is-one-quarter flex">
                <div className="floatDownBox">
                    <h2> Moves </h2>
                    <input onChange={() => validateHasPokemon()} onBlur={() => validateHasMove("One")}
                        type="text" id="moveOne">
                    </input>

                    <input onChange={() => validateHasPokemon()} onBlur={() => validateHasMove("Two")}
                        type="text" id="moveTwo">
                    </input>

                    <input onChange={() => validateHasPokemon()} onBlur={() => validateHasMove("Three")}
                        type="text" id="moveThree">
                    </input>

                    <input onChange={() => validateHasPokemon()} onBlur={() => validateHasMove("Four")}
                        type="text" id="moveFour">
                    </input>
                </div>
            </div>
            <ErrorList key="test" errors={errorMessages} />
        </div>
    )
}

export default BuildBox;