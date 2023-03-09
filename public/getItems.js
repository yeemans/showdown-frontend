var fs = require("fs");
async function get() { 
    let holdItems = await fetch("https://pokeapi.co/api/v2/item-attribute/5");
    let json = await holdItems.json(); 
    json = json["items"];

    let otherItems = await fetch("https://pokeapi.co/api/v2/item-category/held-items");
    let otherJSON = await otherItems.json(); 
    otherJSON = otherJSON["items"];

    console.log(otherJSON);
    for (let item of otherJSON) json.push(item)
    
    
    fs.writeFile("items.json", JSON.stringify(json), (err) => {
        if (err) {  console.error(err);  return; };
        console.log("File has been created");
    });
}

get();