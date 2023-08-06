import {Link} from "react-router-dom"

function TeamListing(props) { 
    function showTeam() {   
        console.log(props.team)
        return
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
            {showTeam()}
            <Link to="/builder" state={{ editTeamId: props.id, team: JSON.stringify(props.team)}}>
                Edit
            </Link>
        </div>
    )
}

export default TeamListing;