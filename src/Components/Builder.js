import React, { useState} from 'react'; 
import BuildBox from './BuildBox';

function Builder() {
    const [buildBoxes, setBuildBoxes] = useState([]);
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    function addPokemon() { 
        setBuildBoxVisible("visible");
    }

    return (
        <div className="Builder">
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>
                <BuildBox />
            </div>
        </div>
    )
}

export default Builder;