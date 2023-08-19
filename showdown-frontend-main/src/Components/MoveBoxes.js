function moveBoxes(props) {

    function handleChange(id) {
        props.hasPokemon();
        props.hasMove(id);
    }

    function getMoveSelect(id, moveIndex) {
        // insert a blank move to make default value blank instead of a move
        let copy = [...props.moves]
        copy.unshift("")
        return(
            <select id={id} onChange={() => handleChange(id)} value={props.moveSet[moveIndex]}> 
                {copy.map(move => {
                    return <option key={id + move} value={move}>{move}</option>
                })}
            </select>
        )
    }

    return( 
        <div>
            <h2>Moves</h2>
            {getMoveSelect("moveOne", 0)}
            {getMoveSelect("moveTwo", 1)}
            {getMoveSelect("moveThree", 2)}
            {getMoveSelect("moveFour", 3)}

        </div>
    )
}

export default moveBoxes;