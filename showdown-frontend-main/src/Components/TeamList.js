import TeamListing from "./TeamListing"; 

function TeamList() { 
    const teamCount = localStorage.getItem("numberOfTeams");
    function getTeamObjects() { 
        let teamObjects = [];
        for (let i = 0; i <= teamCount; i++) { 
            // add the json for each team into array
            // the second part of the array, the id, will be used as key
            if (localStorage.getItem(`team${i}`) !== null)
                teamObjects.push([JSON.parse(localStorage.getItem(`team${i}`)), `team${i}`]);
        }

        console.log("team objects:" )
        console.log(teamObjects)
        return teamObjects;
    }

    function deleteTeam(team) {
        // clear from local storage
        console.log(team)
        localStorage.removeItem(team)
    }
    return( 
        <div className="centered"> 
            {
                getTeamObjects().map(team => {
                    return <TeamListing id={team[1]} key={team[1]} team={team[0]} deleteTeam={deleteTeam}/>;
            })}
        </div>
    )
}

export default TeamList;