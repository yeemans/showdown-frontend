function ErrorList(props) {
    return(
        <ul>
            { 
                props.errors.map(error => (
                    <ul>{error}</ul>
                ))
            }
        </ul>
    );
}

export default ErrorList