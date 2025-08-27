// Controllers for the Opera Collection

import 'dotenv/config';
import express from 'express';
import * as operas from './operas-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/operas', (req,res) => { 
    operas.createOpera(
        req.body.title, 
        req.body.year, 
        req.body.language,
        req.body.length
        )
        .then(opera => {
            console.log(`"${opera.title}" was added to the collection.`);
            res.status(201).json(opera);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'The opera specified was not added correctly.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/operas', (req, res) => {
    operas.retrieveOperas()
        .then(operas => { 
            if (operas !== null) {
                console.log(`All operas were retrieved from the collection.`);
                res.json(operas);
            } else {
                res.status(404).json({ Error: 'The requested operas were not found.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'The request was not able to be completed. Please check the query and try again.' });
        });
});


// RETRIEVE by ID controller
app.get('/operas/:_id', (req, res) => {
    operas.retrieveOperaByID(req.params._id)
    .then(opera => { 
        if (opera !== null) {
            console.log(`"${opera.title}" was retrieved, based on its ID.`);
            res.json(opera);
        } else {
            res.status(404).json({ Error: 'The requested opera was unable to be retrieved. Please check the ID and try again.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'The request was not able to be completed. Please check the query and try again' });
    });

});


// UPDATE controller ************************************
app.put('/operas/:_id', (req, res) => {
    operas.updateOpera(
        req.params._id, 
        req.body.title, 
        req.body.year, 
        req.body.language,
        req.body.length
    )
    .then(opera => {
        console.log(`"${opera.title}" was updated.`);
        res.json(opera);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Unable to update the opera as requested.' });
    });
});


// DELETE Controller ******************************
app.delete('/operas/:_id', (req, res) => {
    operas.deleteOperaById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} opera was deleted.`);
                res.status(200).send({ Success: 'You made a successful deletion.' });
            } else {
                res.status(404).json({ Error: 'The opera was not able to be deleted. Please check that it exists in the database and that the ID is correct.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'There was a problem with the request. Please check the request again.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});