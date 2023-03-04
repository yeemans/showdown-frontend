function SaveButton(props) {
    function addToTeam() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities};
        props.save(info);
    }

    function editPokemon() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "moves": props.moves, "image": props.image, "evs": props.evs,
                    "abilities": props.abilities};

        let teamCopy = props.team;
        // remember that teamIndex is always one head
        teamCopy[props.currentTeamMemberIndex - 1] = info; 
        props.setTeam(teamCopy);
        props.setIsEditing(false);
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
        <div className={show}>
            {getCorrectButton()}
        </div>
    )
}

export default SaveButton;