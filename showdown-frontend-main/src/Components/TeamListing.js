function TeamListing(props) { 
    function allowTeamToBeEdited() {
        props.setEditingTeam(true);
        props.setEditingTeamId(props.id);
    }
    return( 
        <div> 
            {
                props.team.map(pokemon => { 
                    return(
                        <span>
                            <img className="inline headerImage" src={pokemon["image"]} alt={pokemon["image"]}></img>
                        </span>
                    )
                })
            }

            <button onClick={() => allowTeamToBeEdited()}>Edit</button>
            <button onClick={() => props.deleteTeam(props.id)}>Delete</button>
        </div>
    )
}

export default TeamListing;