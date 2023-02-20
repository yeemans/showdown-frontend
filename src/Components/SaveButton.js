function SaveButton(props) {
    function savePokemon() { 
        //let pokemonHash = {"pokemon": props.pokemon, }
        
    }

    let show = "hidden"; 
    if (props.visible) show = "visible";
    return (
        <div className={show}>
            <button>save</button>
        </div>
    )
}

export default SaveButton;