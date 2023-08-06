import React, { useState, useEffect } from 'react'; 
import BuildBox from './BuildBox';
import { useLocation } from 'react-router-dom'

function Builder() {
    const [buildBoxVisible, setBuildBoxVisible] = useState("hidden");
    const [team, setTeam] = useState([]);
    const location = useLocation()

    useEffect(() => {
        if (location.state !== null) {
            console.log(location)
            if ("editTeamId" in location.state) {
                setTeam(JSON.parse(location.state["team"]))
                setBuildBoxVisible("visible")
            }
        }
    }, [location])

    function getTitle() {
        if (location.state !== null && "editTeamId" in location.state) return <h1>Edit Team</h1>
        return <h1>Create a Team</h1>
    }

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
            {getTitle()}
            <button onClick={() => addPokemon()}>Add Pokemon</button>
            <div>

                <BuildBox save={save} team={team} setTeam={setTeam} 
                edit={edit} saveTeamToLocalStorage={saveTeamToLocalStorage} visible={buildBoxVisible} />

            </div>
        </div>
    )
}

export default Builder;