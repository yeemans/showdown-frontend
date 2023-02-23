function FighterBox(props) { 
    return( 
        <div class="columns is-one-sixth"> 
            <div> 
                <img class="headerImage" src={props["pokemonInfo"]["image"]} 
                    alt={props["pokemonInfo"]["pokemon"]}/>
                <p>{props["pokemonInfo"]["pokemon"]}</p>
              
            </div>
        </div>

    )
}

export default FighterBox;