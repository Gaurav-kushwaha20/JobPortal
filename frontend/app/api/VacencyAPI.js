// post a vacancy
export const postVacancy = (data, token, backend_url) => {
    return fetch(`${backend_url}/vacancy/post-vacancy`, {
        method: "POST",
        headers: {
            'Authorization': `bearer ${token}`
        },
        body: data
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

// get the user specific vacancy details
export const getVacancyDetails = async (token, id, backend_url) => {
    return fetch(`${backend_url}/vacancy/get-vacancy-details?id=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log("error while sending the requestin to the backend ", error))
}

// apply for the vacancies
export const applyVacancy = async (token, vacancyId, data, backend_url) => {
    return fetch(`${backend_url}/vacancy/apply/${vacancyId}`, {
        method: "POST",
        headers: {
            'Authorization': `bearer ${token}`
        },
        body: data
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// get the specific user's applied vacancy
export const getAppliedVacancies = async (token, backend_url) => {

    return fetch(`${backend_url}/vacancy/get-user-applied-vacancies`, {
        method: "GET",
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}