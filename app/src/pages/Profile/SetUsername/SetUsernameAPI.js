import API from "../../../utils/API"

export const checkUsernameAvailability = async (username) => {
    return API.get(`/user/check-username-availablity/${username}`).then(res => res).catch(error => error)
}

export const setUsername = async (data) => {
    return API.post('/user/username', data).then(res => res).catch(error => error)
} 