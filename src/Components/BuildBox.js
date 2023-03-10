import { useState, useEffect } from "react";
import ErrorList from "./ErrorList";

import MoveBoxes from "./MoveBoxes";
import ItemBox from "./ItemBox";
import PokemonBox from "./PokemonBox";
import AbilityBox from "./AbilityBox";
import EvBoxes from "./EvBoxes";
import SaveButton from "./SaveButton";
import TeamBar from './TeamBar';
import SuccessMessage from './SuccessMessage';

function BuildBox(props) { 
    const [pokemon, setPokemon] = useState("");
    const [pokemonImage, setPokemonImage] = useState('logo192.png');
    const [itemName, setItemName] = useState("master-ball"); 
    const [itemImage, setItemImage] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png');

    const [abilities, setAbilities] = useState([]);
    const [chosenAbility, setChosenAbility] = useState([]);
    const [errorMessages, setErrorMessages] = useState(["Enter a valid Pokemon name"]);
    const [moves, setMoves] = useState(new Set());
    const [moveSet, setMoveSet] = useState([]);

    const [items, setItems] = useState(["data"]);
    const [evs, setevs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});
    const [remainingEvs, setRemainingEvs] = useState(510);

    const [isEditing, setIsEditing] = useState(false);
    const [teamIndex, setTeamIndex] = useState(0);

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            let item_names = []
            let response = await fetch("items.json");
            const json = await response.json();
    
            for (let item of json)
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
            setIsEditing(false);
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
        
        await console.log(pokemonAbilities);
        await setAbilities(pokemonAbilities);
        await setChosenAbility(pokemonAbilities[0]);
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
        console.log(moves.has(move) || move === ""); 

        if (moves.has(move) || move === "")  {
            deleteError(`Pokemon does not have ${id}`);
        }
        
        if (!(moves.has(move)) && move !== "") {
            addError(`Pokemon does not have ${id}`);
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
        clearMoves();
        setAbilities([])
        setErrorMessages([]);

        setevs({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});
        setRemainingEvs(510);
        setMoveSet([]);
    }

    function resetPokemonAndItem() { 
        setPokemon(""); 
        setPokemonImage("logo192.png");
        setItemName("master-ball"); 
        setItemImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png");
    }

    function updateRemainingEvs(evMap) { 
        let maximum = 510; 

        for (let stat of Object.keys(evMap))
            maximum -= evMap[stat];

        setRemainingEvs(maximum);
        if (maximum < 0)
            addError("Too many ev's"); 
        else 
            deleteError(("Too many ev's"));
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
        setErrorMessages(copy);
    }

    function autoFillFields(hash) { 
        setPokemon(hash["pokemon"]);
        setPokemonImage(hash["image"]);

        setAbilities(hash["abilities"]);
        setChosenAbility(hash["ability"]);

        setItemImage(hash["itemImage"]);
        setItemName(hash["item"]);

        setMoves(hash["moves"]);
        setMoveSet(hash["moveSet"]); 
        
        setevs(hash["evs"]);
        updateRemainingEvs(hash["evs"]);
    }

    function count(array, element) {
        let appearances = 0;
        for (let item of array) { if (item === element) appearances++ }
        return appearances;
    }

    function hasBlankMoveSet() {
        for (let move of moveSet) {
            if (moves.has(move)) return false;
        }

        return true;
    }

    return(
        <div> 
            <SuccessMessage message={message} />
            <TeamBar team={props.team} autoFill={autoFillFields} setIsEditing={setIsEditing} 
                setTeamIndex={setTeamIndex} key={JSON.stringify(props.team)} 

                saveTeamToLocalStorage={props.saveTeamToLocalStorage} 
                setMessage={setMessage}/>

            <div className="columns">
                <div id="species" className="column is-one-quarter">
                    <PokemonBox updatePokemon={setPokemon} getImage={getPokemonImage} 
                    image={pokemonImage} pokemon={pokemon} />
                </div>

                <div id="item" className="column is-one-quarter flex">
                    <ItemBox items={items} itemImage={itemImage} getImage={getItemImage} 
                        setItemName={setItemName} item={itemName} pokemon={pokemon} />
                </div>

                <div id="item" className="column is-one-quarter flex">
                    <AbilityBox abilities={abilities} updateAbility={setChosenAbility} />
                </div>

                <div id="moves" className="column is-one-quarter flex">
                    <div className="floatDownBox">
                        <MoveBoxes hasPokemon={validateHasPokemon} hasMove={validateMove}> </MoveBoxes>
                    </div>
                </div>
            </div>
            
            <ErrorList key="test" errors={errorMessages} />
            <SaveButton team={props.team} setTeam={props.setTeam} save={props.save} pokemon={pokemon}
                moves={moves} moveSet={moveSet} ability={chosenAbility} abilities={abilities}

                item={itemName} image={pokemonImage} evs={evs}
                isEditing={isEditing} setIsEditing={setIsEditing} edit={props.edit}
                teamIndex={teamIndex}
                clearFields={clearFields}
                resetPokemonAndItem={resetPokemonAndItem}

                visible={errorMessages.length === 0 && !hasBlankMoveSet()} />

            <div id="evs"> 
                <EvBoxes evs={evs} errors={errorMessages} setevs={setevs}
                setRemainingEvs={updateRemainingEvs} remainingEvs={remainingEvs}
                addError={addError} deleteError={deleteError} />
            </div>
        </div>
    )
}

export default BuildBox;