import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    return(
        <div class="columns"> 
            {props.team.map(pokemon => (<FighterBox pokemonInfo={pokemon} />))} 
        </div>
    )
}

export default TeamBar;