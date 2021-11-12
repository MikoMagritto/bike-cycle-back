import axios from 'axios';

// eslint-disable-next-line
export default {
    service: axios.create({
        baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
        withCredentials: true
    }),

    login(email, password) {
        return this.service.post('/sessions', { email, password })
            .then(response => {
                return response.data
            })

    },

    signup(email, password, firstName, lastName) {
        return this.service.post('/users', {
            email,
            password,
            firstName,
            lastName
        })
            .then(response => {
                // console.log('response.data: ', response.data)
                return response.data
            })
            .catch(err => {
                // console.log('err: ',err.response)
                return err.response.data
            })
    }
}