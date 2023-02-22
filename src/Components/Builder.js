import React, { useState} from 'react'; 
import BuildBox from './BuildBox';

function Builder() {
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    const [team, setTeam] = useState([]);

    function addPokemon() { 
        setBuildBoxVisible("visible");
    }

    function save(pokemon, index) { 
        let copy = [...team]; 
        copy[index] = pokemon;
        setTeam(copy);
    }

    return (
        <div className="Builder">
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>
                <BuildBox save={save}/>
            </div>
            {team.length};
        </div>
    )
}

export default Builder;