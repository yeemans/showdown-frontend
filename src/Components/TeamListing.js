function TeamListing(props) { 
    return( 
        <div> 
            {
                props.team.map(pokemon => { 
                    return(
                        <span>
                            <img class="inline headerImage" src={pokemon["image"]}></img>
                        </span>
                    )
                })
            }
        </div>
    )
}

export default TeamListing;