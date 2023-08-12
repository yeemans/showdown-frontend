import TeamListing from "./TeamListing"; 

function TeamList(props) { 
    return( 
        <div className="centered"> 
            {
                props.teams.map(team => {
                    return <TeamListing id={team[1]} key={team[1]} team={team[0]} 
                        setTeam={props.setTeam} deleteTeam={props.deleteTeam} 
                        setEditingTeam={props.setEditingTeam} setEditingTeamId={props.setEditingTeamId} />;
            })}
        </div>
    )
}

export default TeamList;