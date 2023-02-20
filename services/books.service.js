const axios = require('axios')

class ApiServiceBooks {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1/volumes?q='
        })
    }
    searchBooks(query) {
        return this.api.get(`${query}`).then(response => response.data.items)
    }
}

module.exports = ApiServiceBooks