function PokemonBox(props) {
    return(
        <div id="species" className="column is-one-quarter">
            <img className="pokemonImage" src={props.image} alt="pokemon" />
            <label htmlFor="speciesInput">Species</label>
            <input type="text" id="speciesInput" 
                onBlur={() => props.getImage("speciesInput")}>

            </input>
        </div>
    )
}

export default PokemonBox;