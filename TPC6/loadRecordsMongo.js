var axios = require('axios')

const jsonData = require('./dataset-extra1.json')

for (p in jsonData['pessoas']) {
    axios.post('http://localhost:3000/pessoas' , jsonData['pessoas'][p])
        .then(res => console.log(res.data))
        .catch(error => console.log("Error: " + error))
}