import {Link} from "react-router-dom"

function TeamListing(props) { 
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
            <Link to="/builder" state={{ editTeamId: props.id, team: JSON.stringify(props.team)}}>
                Edit
            </Link>
            <button onClick={() => props.deleteTeam(props.id)}>Delete</button>
        </div>
    )
}

export default TeamListing;