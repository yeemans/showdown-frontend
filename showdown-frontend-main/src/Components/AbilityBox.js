function AbilityBox(props) {
    function setAbility() { 
        let ability = document.getElementById("abilityInput").value;
        props.updateAbility(ability);
    }
    
    return(
        <div className="floatDownBox">
        <label id="abilityLabel" htmlFor="abilityInput">Ability</label>
        {
            <select id="abilityInput" onChange={setAbility}>
                {
                    props.abilities.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                })}
            </select>
        }
    </div>
    )
}

export default AbilityBox;