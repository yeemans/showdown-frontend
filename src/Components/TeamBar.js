import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    return(
        <div class="columns"> 
            {props.team.map(pokemon => (<FighterBox pokemonInfo={pokemon} 
                autoFill={props.autoFill} moves={props.moves} setIsEditing={props.setIsEditing}
        />))}
         
        </div>
    )
}

export default TeamBar;