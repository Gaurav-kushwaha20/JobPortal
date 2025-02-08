export const getConversation = (user,backend_url)=>{
    return fetch(`${backend_url}/chat/all-user?user=${user}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}