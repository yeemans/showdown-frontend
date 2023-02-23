import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    return(
        <div> 
            {props.team.map(pokemon => (<FighterBox pokemonInfo={pokemon} />))} 
        </div>
    )
}

export default TeamBar;