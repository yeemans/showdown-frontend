import { useState, useEffect } from "react";
import ErrorList from "./ErrorList";
import MoveBoxes from "./MoveBoxes";
import ItemBox from "./ItemBox";
import PokemonBox from "./PokemonBox";
import AbilityBox from "./AbilityBox";

function BuildBox() { 
    const [pokemonImage, setPokemonImage] = useState('logo192.png'); 
    const [itemImage, setItemImage] = useState('logo192.png');

    const [abilities, setAbilities] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [moves, setMoves] = useState(new Set());
    const [moveSet, setMoveSet] = useState(["0", "1", "2", "3"]);

    const [items, setItems] = useState(["data"]);
    const [EVs, setEVs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});

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
            await clearFields();
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

    function validateMove(id) {
        if (!validateHasPokemon()) {
            addError("Choose a valid Pokemon first.");
            return;
        }

        let move = sanitize_text(document.getElementById(id).value);
        console.log(moves.has(move) || move == ""); 

        if (moves.has(move) || move === "")  {
            deleteError(`Pokemon does not have ${id}`);
            console.log('hasMove');
        }
        
        if (!(moves.has(move)) && move !== "") {
            addError(`Pokemon does not have ${id}`);
            console.log('not found');
        }
        
        validateDuplicateMoves(addMove(move, id));
    }

    function addMove(move, id) {
        let index = ["moveOne", "moveTwo", "moveThree", "moveFour"].indexOf(id);
        console.log(index);
        let copy = [...moveSet];
        copy[index] = move;
        setMoveSet(copy);
        return copy;
    }

    function validateDuplicateMoves(currentMoveSet) {
        console.log(currentMoveSet);
        // remove duplicate moves from the input boxes
        let index = 0; 

        for (let move of ["moveOne", "moveTwo", "moveThree", "moveFour"]) {
            let id = move;
            move = sanitize_text(document.getElementById(move).value);

            if (count(currentMoveSet, move) > 1) {
                document.getElementById(id).value = "";
                currentMoveSet[index] = "";
                setMoveSet(currentMoveSet);
            }
            index++;
        }
        
    }

    function sanitize_text(text) {
        return text.replaceAll(" ", "-").toLowerCase();
    }

    async function clearFields() {
        let itemInput = document.getElementById("itemInput")
        itemInput.value = "bright-powder";
        clearMoves();
        await getItemImage("itemInput");
        await setAbilities([])
        await setErrorMessages([]);
    }

    function clearMoves() {
        for (let id of ["One", "Two", "Three", "Four"])
            document.getElementById(`move${id}`).value ="";
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

        console.log(copy);
        setErrorMessages(copy);
    }

    function count(array, element) {
        let appearances = 0;
        for (let item of array) { if (item === element) appearances++ }
        return appearances;
    }

    return(
        <div className="columns">
            <div id="species" className="column is-one-quarter">
                <PokemonBox getImage={getPokemonImage} image={pokemonImage} />
            </div>

            <div id="item" className="column is-one-quarter flex">
                <ItemBox items={items} itemImage={itemImage} getImage={getItemImage} />
            </div>

            <div id="item" className="column is-one-quarter flex">
                <AbilityBox abilities={abilities} />
            </div>

            <div id="moves" className="column is-one-quarter flex">
                <div className="floatDownBox">
                    <MoveBoxes hasPokemon={validateHasPokemon} hasMove={validateMove}> </MoveBoxes>
                </div>
            </div>
            <ErrorList key="test" errors={errorMessages} />
        </div>
    )
}

export default BuildBox;