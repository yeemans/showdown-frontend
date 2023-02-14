function AbilityBox(props) {
    return(
        <div className="floatDownBox">
        <label id="abilityLabel" htmlFor="abilityInput">Ability</label>
        {
            <select>
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