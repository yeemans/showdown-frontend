import FighterBox from "./FighterBox"; 

function TeamBar(props) { 
    function saveTeam() { 
        props.saveTeamToLocalStorage(props.team);
        props.setMessage("Team saved!");
    } 

    function saveToLocalStorageButton() { 
        if (props.team.length > 0) 
            return <button onClick={() => saveTeam()}>Save Team</button>
    }
    
    return(
        <div className="columns"> 
            {props.team.map((pokemon, index) => (<FighterBox pokemonInfo={pokemon} key={index}
                autoFill={props.autoFill} moves={props.moves} setIsEditing={props.setIsEditing}
                teamIndex={index} setTeamIndex={props.setTeamIndex} moveSet={pokemon.moveSet}
        />))}
            {saveToLocalStorageButton()}
            <a href="teams">My Teams</a>
        </div>
    )
}

export default TeamBar;