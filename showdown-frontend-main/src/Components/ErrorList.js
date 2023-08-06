function ErrorList(props) {
    return(
        <ul>
            { 
                props.errors.map(error => (
                    <ul key={error}>{error}</ul>
                ))
            }
        </ul>
    );
}

export default ErrorList