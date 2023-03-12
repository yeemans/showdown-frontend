function TeamListing(props) { 
    return( 
        <div> 
            {
                props.team.map(pokemon => { 
                    return(<p key={props.id + pokemon["pokemon"]}> {pokemon["pokemon"]} </p>)
                })
            }
        </div>
    )
}

export default TeamListing;