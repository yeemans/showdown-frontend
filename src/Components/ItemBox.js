function ItemBox(props) {
    function setItemAndImage(id) { 
        props.getImage(id); 
        props.setItemName(document.getElementById(id).value);
    }

    return(
        <div className="floatDownBox">
            <img className="itemImage" src={props.itemImage} alt="pokemon" id="itemImage"/>
            <label htmlFor="itemInput">Item</label>

            <select id="itemInput" onChange={() => setItemAndImage("itemInput")}>
                {
                    props.items.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                })}
            </select>

        </div>
    )
}

export default ItemBox;