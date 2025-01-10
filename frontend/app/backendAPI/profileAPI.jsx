export const profileInfo = (username, backend_url) => {
    return fetch(`${backend_url}/profile-info`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${username}`
        },

    })
        .then(res => res.json())
        .catch(err => console.log(err));
}