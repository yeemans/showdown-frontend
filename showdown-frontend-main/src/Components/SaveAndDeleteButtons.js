function SaveAndDeleteButtons(props) {
    function addToTeam() {
        if (props.team.length === 6) return;
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities, "teamIndex": props.teamIndex, "tera": props.tera};
        props.save(info);
        props.clearFields(); 
        props.resetPokemonAndItem();
    }

    function editPokemon() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities, "teamIndex": props.teamIndex, "tera": props.tera};

        props.edit(info);
        props.setIsEditing(false);
        props.clearFields();
        props.resetPokemonAndItem();
    }

    function getCorrectButton() { 
        // full team, do not have a button to add pokemon
        if (props.isEditing) 
            return <button onClick={() => editPokemon()}>Save Edit</button>
        if (props.team.length == 6) return

        // if team is not full and not editing, you can add pokemon to team
        return <button onClick={() => addToTeam()}>Add To Team</button>
    }

    let show = "hidden"; 
    if (props.visible) show = "visible";

    return (
        <div>
            <div className={show}>
                {getCorrectButton()}
                {props.deleteButton}
            </div>
        </div>
    )
}

export default SaveAndDeleteButtons;