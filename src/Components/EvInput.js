function EvInput(props) { 
    return(
        <div>
            <p>{`${props.id}: `}</p>
            <input type="text" onChange={() => props.update(`${props.id}text`, props.id)} 
                value={props.evs[props.id]} size="3" maxLength="3" id={`${props.id}text`} />

            <input onChange={() => props.update(props.id, props.id)} type="range" min="0" max="252" 
                defaultValue="0" value={props.evs[props.id]} id={props.id} />
        </div>
    )
}

export default EvInput;