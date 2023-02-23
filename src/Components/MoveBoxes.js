function moveBoxes(props) {

    function handleChange(id) {
        props.hasPokemon();
        props.hasMove(id);
    }

    return( 
        <div>
            <h2>Moves</h2>
            <input onChange={() => handleChange("moveOne")} type="text" id="moveOne" />
            <input onChange={() => handleChange("moveTwo")} type="text" id="moveTwo" />
            <input onChange={() => handleChange("moveThree")} type="text" id="moveThree" />
            <input onChange={() => handleChange("moveFour")} type="text" id="moveFour" />       
        </div>
    )
}

export default moveBoxes;