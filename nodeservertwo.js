const express = require('express')
const app = express()

const data = 'Hello user two!'

app.get('/', (req, res) => {
    res.send(JSON.stringify(data))
});

app.listen(8000, () => {
    console.log('Server started!')
});
