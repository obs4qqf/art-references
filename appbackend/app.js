const express = require("express");
const fsp = require('fs').promises
const path = require('path')

const app = express();

app.use(express.json())

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

app.get('/references/:tag', (req, res) => {
    const {tag} = req.params
    fsp.readFile(path.join(__dirname, '/referencesInfo', 'references.json'))
        .then(data => {
            newData = JSON.parse(data);
            sortedData = newData.filter(reference => reference.tags.includes(tag))
            res.json(sortedData)
        })
        .catch(err => console.log(err));
})

app.put('/references/:id', (req, res) => {
    const {id} = req.params
    const {tagName} = req.body
    fsp.readFile(path.join(__dirname, '/referencesInfo', 'references.json'))
        .then(data => {
            newData = JSON.parse(data);
            newData.forEach(data => {
                if (data.id == id) {
                    data.tags.push(tagName)
                }
            })
            fsp.writeFile(path.join(__dirname, '/referencesInfo', 'references.json'), JSON.stringify(newData, null, 2), err => console.log(err))
                .then(() => {
                    res.json(newData)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));