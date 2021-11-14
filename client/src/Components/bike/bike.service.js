import axios from 'axios';

// eslint-disable-next-line
export default {
    service: axios.create({
        baseURL: `${process.env.REACT_APP_APIURL || ""}/`,
        withCredentials: true
    }),

    addNewBike(name, brand, size, address, availability) {
        return this.service.post("/bikes", {
            name,
            brand,
            size,
            address,
            availability
        })
            .then(response => {
                console.log('response add bike service: ', response.data)
                return response.data
            })
    }
}