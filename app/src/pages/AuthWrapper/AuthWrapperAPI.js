import API from "../../utils/API"

export const getUsername = () => {
    return API.get('/user/get-username')
        .then(response => { return response.data; })
        .catch(error => { return error.response.data; });
};