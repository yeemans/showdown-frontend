function moveBoxes(props) {
    return( 
        <div>
            <h2>Moves</h2>
            <input onChange={() => props.hasPokemon()} onBlur={() => props.hasMove("moveOne")}
                type="text" id="moveOne">
            </input>

            <input onChange={() => props.hasPokemon()} onBlur={() => props.hasMove("moveTwo")}
                type="text" id="moveTwo">
            </input>

            <input onChange={() => props.hasPokemon()} onBlur={() => props.hasMove("moveThree")}
                type="text" id="moveThree">
            </input>

            <input onChange={() => props.hasPokemon()} onBlur={() => props.hasMove("moveFour")}
                type="text" id="moveFour">
            </input>
        </div>
    )
}

export default moveBoxes;