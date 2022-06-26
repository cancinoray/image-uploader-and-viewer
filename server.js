const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(fileUpload());
app.use(cors());
app.use(express.json());

//testing if the server si working on it's port
app.get('/' , (req, res) => {
    res.json('App is working perfectly!')
})

//Upload Endpoint
app.post('./upload', (req, res) => {
    if(req.files === null || !req.files) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file //.file is the field name/type of the form
 

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err) {
            console.error('file.mv part error:', err);
            return res.status(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})


app.listen(PORT, () => {
    console.log(`Server Started and listening to ${PORT}`);
})


//package.json-dependencies
//"server": "nodemon server.js",
// "client": "npm start --prefix client",
// "dev": "concurrently \"npm run server\" \"npm run client\" "