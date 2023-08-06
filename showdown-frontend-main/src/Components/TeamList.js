import TeamListing from "./TeamListing"; 

function TeamList() { 
    const teamCount = localStorage.getItem("numberOfTeams");
    function getTeamObjects() { 
        let teamObjects = [];
        for (let i = 0; i <= teamCount; i++) { 
            // add the json for each team into array
            // the second part of the array, the id, will be used as key
            if (localStorage.getItem(`team${i}`) !== undefined)
                teamObjects.push([JSON.parse(localStorage.getItem(`team${i}`)), `team${i}`]);
        }

        return teamObjects;
    }

    return( 
        <div className="centered"> 
            {
                getTeamObjects().map(team => {
                    return <TeamListing id={team[1]} key={team[1]} team={team[0]} />;
            })}
        </div>
    )
}

export default TeamList;