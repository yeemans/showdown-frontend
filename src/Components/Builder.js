import React, { useState} from 'react'; 
import BuildBox from './BuildBox';

function Builder() {
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    const [team, setTeam] = useState([]);

    function addPokemon() { 
        setBuildBoxVisible("visible");
    }

    function save(pokemonHash) { 
        wipeMoveBoxes(); // wipe any lingering text
        let copy = [...team]; 
        copy.push(pokemonHash);
        setTeam(copy);
    }

    function edit(pokemonHash) { 
        let copy = [...team];
        copy[pokemonHash["teamIndex"]] = pokemonHash; 
        setTeam(copy);
    }

    function wipeMoveBoxes() { 
        for (let id of ["moveOne", "moveTwo", "moveThree", "moveFour"])
            document.getElementById(id).value = "";
    }

    function saveTeamToLocalStorage(team, teamIndex) { 
        let teamCount = teamIndex;
        if (teamIndex === undefined) {
            teamCount = localStorage.getItem("numberOfTeams");
            if (teamCount === null)
                teamCount = 0
            else  
                teamCount++;
        }

        window.localStorage.setItem("numberOfTeams", teamCount);
        console.log("teamcount: " + teamCount);
        window.localStorage.setItem(`team${teamCount}`, JSON.stringify(team));
    }

    return (
        <div className="Builder">
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div className={buildBoxVisible}>

                <BuildBox save={save} team={team} setTeam={setTeam} 
                edit={edit} saveTeamToLocalStorage={saveTeamToLocalStorage} />

            </div>
            {team.length}
        </div>
    )
}

export default Builder;