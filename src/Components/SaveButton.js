function SaveButton(props) {
    function addToTeam() {
        let info = {"pokemon": props.pokemon, "ability": props.ability, "item": props.item,
                    "moveSet": props.moveSet, "image": props.image, "evs": props.evs};
        props.save(info);
    }

    let show = "hidden"; 
    if (props.visible) show = "visible";
    return (
        <div className={show}>
            <button onClick={() => addToTeam()}>save</button>
        </div>
    )
}

export default SaveButton;