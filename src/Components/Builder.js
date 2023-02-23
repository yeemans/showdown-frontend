import React, { useState} from 'react'; 
import BuildBox from './BuildBox';
import TeamBar from './TeamBar';

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
            <TeamBar team={team} />
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>
                <BuildBox save={save}/>
            </div>
            {team.length}
        </div>
    )
}

export default Builder;