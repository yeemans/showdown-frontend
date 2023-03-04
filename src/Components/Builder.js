import React, { useState} from 'react'; 
import BuildBox from './BuildBox';

function Builder() {
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    const [team, setTeam] = useState([]);
    const [currentTeamMemberIndex, setCurrentTeamMemberIndex] = useState(0);

    function addPokemon() { 
        setBuildBoxVisible("visible");
    }

    function save(pokemonHash) { 
        let copy = [...team]; 
        copy.push(pokemonHash);
        setTeam(copy);
        // currentTeammemberIndex is always one ahead
        setCurrentTeamMemberIndex(currentTeamMemberIndex + 1);
    }

    return (
        <div className="Builder">
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>

                <BuildBox save={save} team={team} setTeam={setTeam} 
                currentTeamMemberIndex={currentTeamMemberIndex} 
                setCurrentTeamMemberIndex={setCurrentTeamMemberIndex} />

            </div>
            {team.length}
        </div>
    )
}

export default Builder;