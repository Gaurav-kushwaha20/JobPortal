// post a vacancy
export const postVacancy = (data, token, backend_url) => {
    return fetch(`${backend_url}/vacancy/post-vacancy`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// get the job vacancy
export const getVacancy = (token, backend_url, page, limit) => {
    return fetch(`${backend_url}/vacancy/get-vacancy?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// get the user vacancy for profile page
export const getUserVacancies = (username, backend_url, page, limit) => {

    return fetch(`${backend_url}/vacancy/user-vacancies?page=${page}&limit=${limit}`, {
        // return fetch (`${backend_url}/vacancy/user-vacancies?page=1&limit=2`, {
        method: "GET",
        headers: {
            'Authorization': `bearer ${username}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// delete the user vacancies
export const deleteVacancy = async (token, id, backend_url) => {
    return fetch(`${backend_url}/vacancy/delete-vacancy?id=${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}