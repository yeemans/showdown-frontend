function moveBoxes(props) {

    function handleChange(id) {
        props.hasPokemon();
        props.hasMove(id);
    }

    return( 
        <div>
            <h2>Moves</h2>
            <input onBlur={() => handleChange("moveOne")} type="text" id="moveOne" />
            <input onBlur={() => handleChange("moveTwo")} type="text" id="moveTwo" />
            <input onBlur={() => handleChange("moveThree")} type="text" id="moveThree" />
            <input onBlur={() => handleChange("moveFour")} type="text" id="moveFour" />       
        </div>
    )
}

export default moveBoxes;