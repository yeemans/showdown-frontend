import { useState } from "react";

function EvBoxes() { 
    const [evs, setevs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});

    function updateEv(ev) { 
        let copy = {...evs};
        // extract the stat from ev
        copy[ev.slice(0, 2)] = document.getElementById(ev).value; 
        setevs(copy);
    }

    return( 
        <div>
            <input type="text" onChange={() => updateEv("HPtext")} 
                value={evs["HP"]} size="3" maxLength="3" id="HPtext" />

            <input onChange={() => updateEv("HP")} type="range" min="0" max="252" 
                defaultValue="0" value={evs["HP"]} id="HP" />
        </div>
    )
}

export default EvBoxes;