
// register or sign up to your account
export const register = (user, backend_url) => {
    return fetch(`${backend_url}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

// login to your account
export const login = (user, backend_url) => {
    return fetch(`${backend_url}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            // Check if response is not ok (status is not 2xx)
            return response.json()
        })

        .catch(error => {
            console.log("Login failed:", error);

        });

};

// find the account and send password reset link
export const findMyAccount = (username, backend_url) => {

    return fetch(`${backend_url}/find-your-account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(username)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("Error while sending the requrest: ", error);
        })
}

// verify the token from gmail password reset link
export const verifyTokenForResetPassword = (token, backend_url) => {
    return fetch(`${backend_url}/verify-password-reset-token/${token}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("error sending request ", error)
        })
}
// change the password of user
export const changePassword = (password, token, backend_url) => {
    console.log(token)
    return fetch(`${backend_url}/change-password/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(password)

    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("error while sending the request: ", error);
        })
}


export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}


// check the the token is valid or not to verify user 
export const verifyToken = (token, backend_url) => {
    // this console message will log on the server, the reason behind this is, by default every component in next.js is server components

    return fetch(`${backend_url}/verify-email/${token}`, {
        method: "GET",

    })
        .then(data => {

            return data.json()

        })
        .catch(error => {
            console.log("error while sending the request: ", error)
        })
}

export const loggedInUser = () => {
    const token = localStorage.getItem('user');
    console.log(token)
}

// get profile information
export const getProfile = (token, backend_url) => {
    return fetch(`${backend_url}/get-profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        },
        
    }).then(response => response.json())
        .catch(error => { console.log(error) })
}

// get the user role 
export const getUserRole = (token, backend_url) => {
    return fetch(`${backend_url}/get-user-role`, {
        method: "GET",
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    .then(response =>  response.json())
    .catch(error => console.log(error))
}

export const uploadProfile = (token, formdata, backend_url) => {
    console.log(formdata)
    return fetch(`${backend_url}/change-profile-picture`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // Ensure 'Bearer' is capitalized

        },
        body: formdata,
    })
    .then(response => response.json())
    .catch(error => console.log(error));
};
