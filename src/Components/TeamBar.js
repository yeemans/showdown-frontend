import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    return(
        <div className="columns"> 
            {props.team.map((pokemon, index) => (<FighterBox pokemonInfo={pokemon} 
                autoFill={props.autoFill} moves={props.moves} setIsEditing={props.setIsEditing}
                teamIndex={index} setTeamIndex={props.setTeamIndex}
        />))}
         
        </div>
    )
}

export default TeamBar;