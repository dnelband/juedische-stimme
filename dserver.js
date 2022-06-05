const express = require('express')
const path = require("path")
const fs = require('fs');
const app = express()
const port = 4000
var cors = require('cors');

/*
    THIS IS A MINI SERVER WITH THE SOLE PURPOSE OF DELETING FILES 
    BECAUSE NEXT.JS DOESNT HAVE A BUILT IN SOLUTION FOR THAT
*/

// cors
app.use(cors());

// delete file
app.delete('/media/:filename', (req,res) => {
    const filePath = path.join(__dirname, `/public/wp-content/uploads/${req.params.filename.split('+++').join('/')}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    res.status(200).send({message:'file deleted!'})
})

// start the server
app.listen(port, () => {
  console.log(`mini server to delete files running on: ${port}`)
}) 