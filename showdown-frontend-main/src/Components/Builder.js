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
        let teamId = teamIndex;
        let teamCount;

        console.log(location.state)
        console.log(teamIndex)
        // do not change teamCount if we are editing a team
        if (location.state !== null && "editTeamId" in location.state) {
            teamId = location.state["editTeamId"]
            teamCount = localStorage.getItem("numberOfTeams")
        }

        else if (teamIndex === undefined) {
            teamCount = +localStorage.getItem("numberOfTeams");
            if (teamCount === null || teamCount === undefined)
                teamCount = 0
            else  
                teamCount++

            console.log(teamCount)
            teamId = "team" + teamCount
        }

        // slice the first four characters of teamId to find the number of teams
        console.log(teamCount + ', ' + teamId)
        window.localStorage.setItem("numberOfTeams", teamCount);
        console.log("teamcount: " + teamId);
        window.localStorage.setItem(teamId, JSON.stringify(team));
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