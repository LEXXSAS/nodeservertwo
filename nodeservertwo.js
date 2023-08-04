const express = require('express')
const app = express()

const data = 'Hello user two!'

app.get('/data', (req, res) => {
    res.send(JSON.stringify(data))
});

app.listen(8089, () => {
    console.log('Server started!')
});
