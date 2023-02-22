const axios = require('axios')

class ApiServiceBooks {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1'
        })
    }

    searchBooks(query) {
        return this.api.get(`/volumes?q=${query}`).then(({ data }) => data)
    }
}

module.exports = ApiServiceBooks