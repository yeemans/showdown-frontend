import EvInput from "./EvInput";

function EvBoxes(props) { 
    function updateEv(id, ev) { 
        let copy = {...props.evs};
        let input = document.getElementById(id);
        // extract the stat from ev
        input.value = Math.min(+input.value, 252);

        copy[ev] = input.value; 
        props.setevs(copy);
        props.setRemainingEvs(copy);
    }


    return( 
        <div>
            {
                ["HP", "Atk", "Def", "SpA", "SpD", "Spe"].map(stat => {
                    return (<EvInput setRemaining={props.setRemainingEvs}
                        update={updateEv} id={stat} evs={props.evs} />);
            })}

            <p>Remaining: {props.remainingEvs}</p> 
        </div>
    )
}

export default EvBoxes;