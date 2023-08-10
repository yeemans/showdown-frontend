import React, { useState, useEffect } from 'react'; 
import BuildBox from './BuildBox';
import { useLocation } from 'react-router-dom'
import TeamList from './TeamList';

function Builder() {
    const [team, setTeam] = useState([]);
    const [teams, setTeams] = useState([]);
    const location = useLocation();
    const [editingTeam, setEditingTeam] = useState(false)
    const [editingTeamId, setEditingTeamId] = useState("");

    useEffect(() => {
        setTeams(getTeams())
    }, [])
    
    function getTeams() {
        let teamObjects = [];
        const teamCount = localStorage.getItem("numberOfTeams");
        for (let i = 0; i <= teamCount; i++) { 
            // add the json for each team into array
            // the second part of the array, the id, will be used as key
            if (localStorage.getItem(`team${i}`) !== null)
                teamObjects.push([JSON.parse(localStorage.getItem(`team${i}`)), `team${i}`]);
        }
        return teamObjects
    }

    function deleteTeam(team) {
        // clear from local storage
        localStorage.removeItem(team)
        setTeams(getTeams())
    }

    useEffect(() => {
        // if there is a team to be edited
        if (editingTeam) {
            setTeam(JSON.parse(localStorage.getItem(editingTeamId)))
        }
    }, [editingTeamId])

    function getTitle() {
        if (editingTeam) return <h1>Edit Team</h1>
        return <h1>Create a Team</h1>
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

        // do not change teamCount if we are editing a team
        if (editingTeam) {
            teamId = editingTeamId
            teamCount = +localStorage.getItem("numberOfTeams")
        }

        else {
            // increment teamCount to create a unique teamID
            teamCount = +localStorage.getItem("numberOfTeams");
            if (teamCount === null || teamCount === undefined)
                teamCount = 0
            else  
                teamCount++

            console.log(teamCount)
            teamId = "team" + teamCount
        }

        window.localStorage.setItem("numberOfTeams", teamCount);
        window.localStorage.setItem(teamId, JSON.stringify(team));
        // return the saved team and team id for use in save function in teamBar
        return [team, teamId];
    }


    return (
        <div className="Builder">
            {getTitle()}
            <div>
                <button onClick={() => setEditingTeam(false)}>Create New Team</button>
                <BuildBox save={save} team={team} setTeam={setTeam} setTeams={setTeams}
                getTeams={getTeams} edit={edit} 
                saveTeamToLocalStorage={saveTeamToLocalStorage} editingTeam={editingTeam} />

                <TeamList teams={teams} deleteTeam={deleteTeam} setEditingTeam={setEditingTeam} 
                    setEditingTeamId={setEditingTeamId} set/>
            </div>
        </div>
    )
}

export default Builder;