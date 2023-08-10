import TeamListing from "./TeamListing"; 
import {useState, useEffect} from "react"

function TeamList() { 
    const teamCount = localStorage.getItem("numberOfTeams");
    const [teams, setTeams] = useState([])

    useEffect(() => {
        setTeams(getTeams())
    }, [])
    
    function getTeams() {
        let teamObjects = [];
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
    return( 
        <div className="centered"> 
            {
                teams.map(team => {
                    return <TeamListing id={team[1]} key={team[1]} team={team[0]} deleteTeam={deleteTeam}/>;
            })}
        </div>
    )
}

export default TeamList;