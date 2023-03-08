import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    return(
        <div className="columns"> 
            {props.team.map((pokemon, index) => (<FighterBox pokemonInfo={pokemon} key={index}
                autoFill={props.autoFill} moves={props.moves} setIsEditing={props.setIsEditing}
                teamIndex={index} setTeamIndex={props.setTeamIndex} moveSet={pokemon.moveSet}
        />))}
         
        </div>
    )
}

export default TeamBar;