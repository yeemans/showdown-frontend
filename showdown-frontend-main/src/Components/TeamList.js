import TeamListing from "./TeamListing"; 

function TeamList(props) { 
    return( 
        <div className="centered"> 
            {
                props.teams.map(team => {
                    return <TeamListing id={team[1]} key={team[1]} team={team[0]} deleteTeam={props.deleteTeam}/>;
            })}
        </div>
    )
}

export default TeamList;