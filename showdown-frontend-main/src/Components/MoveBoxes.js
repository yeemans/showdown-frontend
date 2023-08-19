function moveBoxes(props) {

    function handleChange(id) {
        props.hasPokemon();
        props.hasMove(id);
    }

    function getMoveSelect(id) {
        return(
            <select id={id} onChange={() => handleChange(id)}> 
                {props.moves.map(move => {
                    return <option value={move}>{move}</option>
                })}
            </select>
        )
    }

    return( 
        <div>
            <h2>Moves</h2>
            {getMoveSelect("moveOne")}
            {getMoveSelect("moveTwo")}
            {getMoveSelect("moveThree")}
            {getMoveSelect("moveFour")}

            <input onChange={() => handleChange("moveOne")} type="text" id="moveOne" />
            <input onChange={() => handleChange("moveTwo")} type="text" id="moveTwo" />
            <input onChange={() => handleChange("moveThree")} type="text" id="moveThree" />
            <input onChange={() => handleChange("moveFour")} type="text" id="moveFour" />       
        </div>
    )
}

export default moveBoxes;