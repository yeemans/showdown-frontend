import { useState } from "react";
import EvInput from "./EvInput";

function EvBoxes(props) { 
    const [evs, setevs] = useState({"HP": 0 , "Atk": 0, "Def": 0, "SpA": 0, "SpD": 0 , "Spe": 0});
    const [remainingEvs, setRemainingEvs] = useState(510);

    function updateEv(id, ev) { 
        let copy = {...evs};
        let input = document.getElementById(id);
        // extract the stat from ev
        input.value = Math.min(+input.value, 252);

        copy[ev] = input.value; 
        setevs(copy);
        updateRemainingEvs(copy);
    }

    function updateRemainingEvs(evMap) { 
        let maximum = 510; 

        for (let stat of Object.keys(evMap)) {
            console.log(stat)
            maximum -= evMap[stat];
        }

        setRemainingEvs(maximum);
        if (maximum < 0)
            props.addError("Too many ev's"); 
        else 
            props.deleteError(("Too many ev's"));
    }

    return( 
        <div>
            {
                ["HP", "Atk", "Def", "SpA", "SpD", "Spe"].map(stat => {
                    return (<EvInput setRemaining={updateRemainingEvs}
                        update={updateEv} id={stat} evs={evs}/>);
            })}

            <p>Remaining: {remainingEvs}</p>
        </div>
    )
}

export default EvBoxes;