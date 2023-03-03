function PokemonBox(props) {

    function updatePokemon(id) { 
        let input = document.getElementById(id).value;
        props.getImage(id);
        props.updatePokemon(input);
    }

    return(
        <div id="species" className="column is-one-quarter">
            <img className="pokemonImage" src={props.image} alt="pokemon" id="pokemonImage" />
            <label htmlFor="speciesInput">Species</label>
            <input type="text" id="speciesInput" 
                onBlur={() => updatePokemon("speciesInput")}>

            </input>
        </div>
    )
}

export default PokemonBox;