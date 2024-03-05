import API from "../../utils/API"

export const getUSer = () => { return API.get('/getUser').then(res => res.josn()).catch(err => err) }