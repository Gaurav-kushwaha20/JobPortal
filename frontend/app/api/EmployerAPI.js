//  register to your account
export const registerEmployer =(employer, backend_url) =>{
    // console.log(employer)
    return fetch(`${backend_url}/employer/register`, {
        method:"POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(employer)
    })
    .then(response => response.json())
    .catch(error => console.log(error))

}


//  login to your account
export const loginEmployer =(employer, backend_url) =>{
    // console.log(employer)
    return fetch(`${backend_url}/employer/login`, {
        method:"POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(employer)
    })
    .then(response => response.json())
    .catch(error => console.log(error))

}