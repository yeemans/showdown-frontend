function TeraBox(props) {
    const types = ["Normal", "Fire", "Water", "Grass", "Electric",
    "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic",
    "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"]

    return(
        <div class="floatDownBox">
            <label htmlFor="teraInput">Tera</label>
            <select name="teraInput" id="teraInput" onChange={(e) => props.setTera(e.target.value)}>
                {types.map(type => {
                    return <option value={type}>{type}</option>
                })}
            </select>
            
        </div>
    )
}

export default TeraBox