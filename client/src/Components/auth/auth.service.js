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
                return response.data
            })
    },

    getUser() {
        return this.service.get('/session')
            .then(response => {
                console.log('response auth: ', response.data.user)
                return response.data.user
            })
            .catch(err => {
                return err.response.data
            })
    },

    logout() {
        return this.service.delete('/session')
            .then(response => {
                return response.data
            })
            .catch(err => {
                return err.response.data
            })
    }
}