function AbilityBox(props) {
    return(
        <div className="floatDownBox">
            <img className="itemImage" src={props.itemImage} alt="pokemon" id="itemImage"/>
            <label htmlFor="itemInput">Item</label>

            <select id="itemInput" onChange={() => props.getImage("itemInput")}>
                {
                    props.items.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                })}
            </select>

        </div>
    )
}

export default AbilityBox;