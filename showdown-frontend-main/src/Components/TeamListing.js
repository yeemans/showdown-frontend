function TeamListing(props) { 
    function allowTeamToBeEdited() {
        props.setEditingTeam(true);
        props.setEditingTeamId(props.id);
    }

    function deleteTeam() {
        props.deleteTeam(props.id);
        props.setEditingTeam(false);
        props.setEditingTeamId(""); // blank id, no longer editing
        props.setIsEditing(false);
        props.setTeam([]); // clear the team after deleting it
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
            <button onClick={() => deleteTeam()}>Delete</button>
        </div>
    )
}

export default TeamListing;