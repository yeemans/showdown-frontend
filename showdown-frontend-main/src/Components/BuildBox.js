import { useState, useEffect } from "react";
import ErrorList from "./ErrorList";

import MoveBoxes from "./MoveBoxes";
import ItemBox from "./ItemBox";
import PokemonBox from "./PokemonBox";
import AbilityBox from "./AbilityBox";
import TeraBox from "./TeraBox";
import EvBoxes from "./EvBoxes";
import SaveButton from "./SaveButton";
import TeamBar from './TeamBar';
import SuccessMessage from './SuccessMessage';

function BuildBox(props) { 
    const [allPokemon, setAllPokemon] = useState(new Set()) 
    const [pokemon, setPokemon] = useState("");
    const [pokemonImage, setPokemonImage] = useState('logo192.png');
    const [itemName, setItemName] = useState("master-ball"); 
    const [itemImage, setItemImage] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png');

    const [abilities, setAbilities] = useState([]);
    const [chosenAbility, setChosenAbility] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [tera, setTera] = useState("Normal")
    const [moves, setMoves] = useState(new Set());
    const [moveSet, setMoveSet] = useState([]);

    const [items, setItems] = useState(["data"]);
    const [evs, setevs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});
    const [remainingEvs, setRemainingEvs] = useState(510);

    const [teamIndex, setTeamIndex] = useState(0);

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchItems = async() => {
            let item_names = []
            let response = await fetch("items.json");
            const json = await response.json();
    
            for (let item of json)
                item_names.push(item['name'])
    
            setItems(item_names);
          }

          const fetchAllPokemon = async() => {
            let url = "https://pokeapi.co/api/v2/pokemon?limit=20000"
            let response = await fetch(url)
            const json = await response.json()
            let allNames = new Set()
            for (let response of json["results"])
                allNames.add(response["name"])

            console.log(allNames)
            setAllPokemon(allNames)
          }

          fetchItems();
          fetchAllPokemon();
    }, []);

    async function getPokemonImage(pokemon) { 
        let input = sanitize_text(pokemon);
        console.log(input)
        let url = `https://pokeapi.co/api/v2/pokemon/${input}`.toLowerCase();
        clearFields();
        setErrorMessages([]);
        try {
            let response = await fetch(url);
            let data = await response.json();
            setPokemonImage(data["sprites"]["front_default"])

            updateAbilities(data);
            console.log(data);
            getPossibleMoves(data);

        
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
        console.log(data["moves"])
        for (let move of data["moves"]) {
            possibleMoves.add(move["move"]["name"]);
        }

        setMoves(possibleMoves);
        return possibleMoves
    }

    async function updateAbilities(data) {
        let pokemonAbilities = [];
        for (let ability of data["abilities"])
            pokemonAbilities.push(ability["ability"]["name"]);
        
        // sometimes an ability can get pushed twice because of api errors
        pokemonAbilities = Array.from(new Set(pokemonAbilities))
        await console.log(pokemonAbilities);
        await setAbilities(pokemonAbilities);
        await setChosenAbility(pokemonAbilities[0]);
    }

    function updatePokemon(e) {
        let species = sanitize_text(e.target.value)
        console.log("species: " + species)
        if (!(allPokemon.has(species))) 
            addError("Enter a valid Pokemon name")
        else
            deleteError("Enter a valid Pokemon name")

        // get names of all pokemon in team

        setPokemon(species)
    }

    function validateHasPokemon() {
        if (!(allPokemon.has(pokemon))) {
            addError("Enter a valid Pokemon name");
            return false;
        }
        return true;
    }

    function validateMove(id) {
        if (!validateHasPokemon()) {
            addError("Enter a valid Pokemon name");
            return;
        }

        let move = sanitize_text(document.getElementById(id).value);
        console.log([typeof(moves), moves])
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
        setAbilities([]);
        setErrorMessages([]);
        setItemName("master-ball"); 
        setItemImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png');

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

        setTera(hash["tera"])

        setItemImage(hash["itemImage"]);
        setItemName(hash["item"]);

        setMoves(hash["moves"]);
        setMoveSet(hash["moveSet"]); 
        
        setevs(hash["evs"]);
        updateRemainingEvs(hash["evs"]);
        // delete the name error, since only valid pokemon can be saved
        deleteError("Enter a valid Pokemon name")
    }

    function count(array, element) {
        let appearances = 0;
        for (let item of array) { if (item === element) appearances++ }
        return appearances;
    }

    function hasBlankMoveSet() {
        return moveSet.length === 0
    }

    function deletePokemon() {
        props.setIsEditing(false);
        let copy = []
        for (let teamMember of props.team) {
            if (teamMember["pokemon"] !== pokemon) 
                copy.push(teamMember)
        }

        props.setTeam(copy)
        // reset pokemon fields
        clearFields()
        setPokemon("")
        setPokemonImage("logo192.png")
    }

    function getDeleteButton() {
        if (!(allPokemon.has(pokemon))) return // return no button, nothing to delete
        return <button onClick={() => deletePokemon() }>Delete</button>
    }

    async function addRecToTeam() {
        let recJson = await(props.getRecommendation())
        let recommendedPokemon = sanitize_text(recJson["recs"][0])
        setPokemon(recommendedPokemon)
        await getPokemonImage(recommendedPokemon)
    }
    return(
        <div> 
            <SuccessMessage message={message} />
            <TeamBar team={props.team} autoFill={autoFillFields} setIsEditing={props.setIsEditing} 
                setTeamIndex={setTeamIndex} key={JSON.stringify(props.team)} 

                saveTeamToLocalStorage={props.saveTeamToLocalStorage} 
                setMessage={setMessage} getPossibleMoves={getPossibleMoves} setTeams={props.setTeams} 
                getTeams={props.getTeams} setEditingTeam={props.setEditingTeam} />

            <div>
                <div className="columns">
                    <div id="species" className="column is-one-fifth">
                        <PokemonBox updatePokemon={updatePokemon} getImage={getPokemonImage} 
                        image={pokemonImage} pokemon={pokemon} />
                    </div>

                    <div id="item" className="column is-one-fifth flex">
                        <ItemBox items={items} itemImage={itemImage} getImage={getItemImage} 
                            setItemName={setItemName} item={itemName} pokemon={pokemon} key={itemName} />
                    </div>

                    <div id="ability" className="column is-one-fifth flex">
                        <AbilityBox abilities={abilities} updateAbility={setChosenAbility} pokemon={pokemon} />
                    </div>

                    <div id="tera" className="column is-one-fifth flex">
                        <TeraBox tera={tera} setTera={setTera} />
                    </div>

                    <div id="moves" className="column is-one-fifth flex">
                        <div className="floatDownBox">
                            <MoveBoxes hasPokemon={validateHasPokemon} hasMove={validateMove}> </MoveBoxes>
                        </div>
                    </div>

                </div>
            
            
                <ErrorList key="test" errors={errorMessages} />
                <SaveButton team={props.team} setTeam={props.setTeam} save={props.save} pokemon={pokemon}
                    moves={moves} moveSet={moveSet} ability={chosenAbility} tera={tera} 
                    abilities={abilities}

                    item={itemName} image={pokemonImage} evs={evs}
                    isEditing={props.isEditing} setIsEditing={props.setIsEditing} edit={props.edit}
                    teamIndex={teamIndex}
                    clearFields={clearFields}
                    resetPokemonAndItem={resetPokemonAndItem}

                    visible={errorMessages.length === 0 && !hasBlankMoveSet()} />

                <div id="evs"> 
                    <EvBoxes evs={evs} errors={errorMessages} setevs={setevs}
                    setRemainingEvs={updateRemainingEvs} remainingEvs={remainingEvs}
                    addError={addError} deleteError={deleteError} />
                </div>
                <button onClick={() => addRecToTeam()}>Recommend</button>
                {getDeleteButton()}
            </div>
        </div>
    )
}

export default BuildBox;