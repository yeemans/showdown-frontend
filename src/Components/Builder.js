import React, { useState} from 'react'; 
import BuildBox from './BuildBox';

function Builder() {
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    const [team, setTeam] = useState([]);

    function addPokemon() { 
        setBuildBoxVisible("visible");
    }

    function save(pokemonHash) { 
        let copy = [...team]; 
        copy.push(pokemonHash);
        setTeam(copy);
    }

    return (
        <div className="Builder">
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>
                <BuildBox save={save} team={team}/>
            </div>
            {team.length}
        </div>
    )
}

export default Builder;