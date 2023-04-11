function TeamListing(props) { 
    return( 
        <div> 
            {
                props.team.map(pokemon => { 
                    return(
                        <span>
                            <img className="inline headerImage" src={pokemon["image"]}></img>
                        </span>
                    )
                })
            }
        </div>
    )
}

export default TeamListing;