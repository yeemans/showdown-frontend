import { useState } from "react";
import EvInput from "./EvInput";

function EvBoxes() { 
    const [evs, setevs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});

    function updateEv(id, ev) { 
        let copy = {...evs};
        // extract the stat from ev
        copy[ev] = document.getElementById(id).value; 
        setevs(copy);
    }

    return( 
        <div>
            {
                ["HP", "Atk", "Def", "SpA", "SpD", "Spe"].map(stat => {
                    return (<EvInput update={updateEv} id={stat} evs={evs}/>);
            })}
        </div>
    )
}

export default EvBoxes;