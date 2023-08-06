function PokemonBox(props) {

    function updatePokemon(id) { 
        let input = document.getElementById(id).value;
        props.updatePokemon(input);
    }
    

    return(
        <div id="species" className="column is-one-quarter">
            <img className="pokemonImage" src={props.image} alt="pokemon" id="pokemonImage" />
            <label htmlFor="speciesInput">Species</label>
            <input type="text" id="speciesInput" value={props.pokemon}
                onChange={() => updatePokemon("speciesInput")} onBlur={() => props.getImage("speciesInput")}>

            </input>
        </div>
    )
}

export default PokemonBox;