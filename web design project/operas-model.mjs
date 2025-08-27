// Models for the Opera Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Server failed to connect.' });
    } else  {
        console.log('Success: You are connected to the MongoDB database.');
    }
});


// SCHEMA: Define the collection's schema.
const operaSchema = mongoose.Schema({
 
	title:    { type: String, required: true },
	year:     { type: Date, required: true, default: Date.now },
	language: { type: String, required: true },
    length:   { type: Number, required: true}
});
  
// Compile the model from the schema 
// by defining the collection name "operas".
const operas = mongoose.model('Operas', operaSchema);


// CREATE model *****************************************
const createOpera = async (title, year, language, length) => {
    const opera = new operas({ 
        title: title, 
        year: year, 
        language: language,
        length: length 
    });
    return opera.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveOperas = async () => {
    const query = operas.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveOperaByID = async (_id) => {
    const query = operas.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteOperaById = async (_id) => {
    const result = await operas.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateOpera = async (_id, title, year, language, length) => {
    const result = await operas.replaceOne({_id: _id }, {
        title: title,
        year: year,
        language: language,
        length: length
    });
    return { 
        _id: _id, 
        title: title,
        year: year,
        language: language,
        length: length 
    }
}

// EXPORT the variables for use in the controller file.
export { createOpera, retrieveOperas, retrieveOperaByID, updateOpera, deleteOperaById }