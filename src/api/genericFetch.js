const genericFetch = (url, options) => {
    return fetch(`http://localhost:9000/api/${url}`, {
        ...options,
        headers: new Headers({
            "Content-type": "application/json"
        })
    });
};

export default genericFetch;