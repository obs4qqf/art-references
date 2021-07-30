const express = require("express");
const fsp = require('fs').promises
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname, 'images')))

app.get('/api', (req, res) => {
    res.json({ message : "Hello World From Server!"})
})

app.get('/references', (req, res) => {
    fsp.readFile(path.join(__dirname, '/referencesInfo', 'references.json'))
        .then(data => {
            newData = JSON.parse(data);
            res.json(newData)
        })
        .catch(err => console.log(err));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));