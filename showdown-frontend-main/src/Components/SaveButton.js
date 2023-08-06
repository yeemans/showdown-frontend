function SaveButton(props) {
    function addToTeam() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities, "teamIndex": props.teamIndex};
        props.save(info);
        props.clearFields(); 
        props.resetPokemonAndItem();
    }

    function editPokemon() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities, "teamIndex": props.teamIndex};

        props.edit(info);
        props.setIsEditing(false);
        props.clearFields();
        props.resetPokemonAndItem();
    }

    function getCorrectButton() { 
        let button = <button onClick={() => addToTeam()}>Add To Team</button>; 
        if (props.isEditing) 
           button = <button onClick={() => editPokemon()}>Save Edit</button>

        return button;
    }

    let show = "hidden"; 
    if (props.visible) show = "visible";

    return (
        <div>
            <div className={show}>
                {getCorrectButton()}
            </div>
        </div>
    )
}

export default SaveButton;