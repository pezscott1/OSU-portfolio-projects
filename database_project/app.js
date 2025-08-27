//These setup files were created according to the Week 6 exploration and with help from Copilot.
// (https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948_)

// Copilot.cloud.microsoft provided code for Handlebars Date helper, phone number regex, and generally how to get at the values
// while using CALL inside a get or post. Basic debugging/troubleshooting also produced modifications of code we had written with minor differences.

// ########################################
// ########## SETUP



const express = require('express');
const exphbs = require('express-handlebars'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 8182;

// Database
const db = require('./database/db-connector');

// Handlebars with date helper

const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    formatDate: function (datetime) {
      if (!datetime) return '';
      return new Date(datetime).toISOString().split('T')[0];
    }
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/', async function (req, res) {

    try {
        res.render('home'); // Render the home.hbs file
    } catch (error) {
        console.error('Error rendering page:', error);
        // Send a generic error message to the browser
        res.status(500).send('An error occurred while rendering the page.');
    }
});

app.get('/Customers', async function (req, res) {

    try {
        
        const [rows] = await db.query(`CALL sp_Get_Customers();`);
        const customers = rows[0];
        res.render('Customers', {customers} );
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/Check_Outs', async function (req, res) {
 
    try {
        const [checkOutRows] = await db.query(`CALL sp_Get_Check_Outs();`);
        const check_outs = checkOutRows[0];

        const [customerRows] = await db.query(`CALL sp_Get_Customers();`);
        const customers_names = customerRows[0];

        const [mediaRows] = await db.query(`CALL sp_Get_Media();`);
        const media_names = mediaRows[0];

        res.render('Check_Outs', {
            check_outs,
            customers_names,
            media_names
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.get('/Media', async function (req, res) {

    try {
        // Create and execute our queries
        const [rows] = await db.query(`CALL sp_Get_Media();`);
        const media = rows[0]
        const [genre] = await db.query(`CALL sp_Get_Genres();`);

        res.render('Media', { media: media, genre: genre});
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/Genres', async function (req, res) {
    try {
        // Create and execute our queries
        const [rows] = await db.query(`CALL sp_Get_Genres();`);
        const genres = rows[0]

        res.render('Genres', { genres: genres });
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.get('/Media_Has_Genres', async function (req, res) {
    try {
        // Create and execute our queries

        const [rows] = await db.query(`CALL sp_Get_Media_Has_Genres();`);
        const media_genres = rows[0]
        const [title] = await db.query(`CALL sp_Get_Media();`);
        const titles = title[0];
        const [genre] = await db.query(`CALL sp_Get_Genres();`);
        const genres = genre[0];

        res.render('Media_Has_Genres', { media_genres, titles, genres} );
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// RESET ROUTE
app.post('/reset', async function (req, res) {
    try {

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_ResetSite();`;

        await db.query(query1);
        
        console.log(`RESET site completed.`);

        // Redirect the user to the updated webpage
        res.redirect('/');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// CREATE ROUTES
app.post('/Customers/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
        
        // phone number handling borrowed from Copilot
        const phone = data.create_customer_phone_number?.trim();

        if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        const [customers] = await db.query('SELECT * FROM Customers');
            return res.render('Customers', {
        errorMessage: 'Invalid phone number format. Use XXX-XXX-XXXX.',
        formData: data, customers: customers });
        }   

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateCustomer(?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_customer_first_name,
            data.create_customer_last_name,
            data.create_customer_email,
            data.create_customer_phone_number,
            data.create_customer_fine,
        ]);

        console.log(`CREATE Customers. ID: ${rows.new_id} ` +
            `Name: ${data.create_customer_first_name} ${data.create_customer_last_name}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/Customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/Media/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_CreateMedia(?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [
            data.create_media_title,
            data.create_media_author_director_artist,
            data.create_media_type,
            data.create_media_is_electronic,
            data.create_media_checked_out,
        ]);

        console.log(`CREATE Media. ID: ${rows.new_id} ` +
            `Item: ${data.create_media_title} ${data.create_media_author_director_artist}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/Media');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/Genres/create', async function (req, res) {
    try {
        const data = req.body;

        const query1 = `CALL sp_CreateGenre(?, @new_id);`;
        await db.query(query1, [data.create_genre_description]);

        
        const [[row]] = await db.query('SELECT @new_id AS new_id;');
        const new_id = row.new_id;

        console.log(`CREATE Genre. ID: ${new_id} | New Genre: ${data.create_genre_description}`);

        res.redirect('/Genres');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.post('/Check_Outs/create', async function (req, res) {
    try {
        const data = req.body;

        // Call stored procedure with IDs directly from the form
        const query1 = `CALL sp_CreateCheck_Out(?, ?, ?, ?, @new_id);`;
        await db.query(query1, [
            data.create_check_out_customer_name,  // This is the customer ID
            data.create_media_check_out,          // This is the media ID
            data.create_check_out_date,
            data.create_check_out_due_date,
        ]);

        // Get the new check_out ID
        const [[newIdRow]] = await db.query('SELECT @new_id AS new_id;');
        const newId = newIdRow.new_id;

        console.log(`CREATE Check_Out. ID: ${newId} | Customer ID: ${data.create_check_out_customer_name} | Media ID: ${data.create_media_check_out}`);

        res.redirect('/Check_Outs');
    } catch (error) {
        console.error('Error executing queries:', error.message, error.stack);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


app.post('/Media_Has_Genres/create', async function (req, res) {
    try {
        const data = req.body;

        // Call stored procedure with IDs directly from the form
        const query1 = `CALL sp_Create_MediaGenre(?, ?);`;
        await db.query(query1, [
            data.create_media_id,
            data.create_genre_id,
        ]);

        console.log(`CREATE MediaGenre.  Media ID: ${data.create_media_id} | Genre ID: ${data.create_genre_id}`);

        res.redirect('/Media_Has_Genres');
    } catch (error) {
        console.error('Error executing queries:', error.message, error.stack);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});



// UPDATE ROUTES

// syntax around dealing with phone numbers taken from Copilot

app.post('/Customers/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        let phone = data.create_customer_phone_number?.trim();

        if (phone && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        const [customers] = await db.query('SELECT * FROM Customers');
        return res.render('Customers', {
        errorMessage: 'Invalid phone number format. Use XXX-XXX-XXXX.',
        formData: data, customers: customers});
        }

        if (!phone) {
            const [[existing]] = await db.query(
            'SELECT phone_number FROM Customers WHERE id_customer = ?',
            [data.update_customer_id]);
            phone = existing?.phone_number || null; // fallback to null if not found
        }

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = 'CALL sp_UpdateCustomer(?, ?, ?, ?);';
        const query2 = 'SELECT first_name, last_name FROM Customers WHERE id_customer = ?;';
        await db.query(query1, [
            data.update_customer_id,
            data.update_customer_email,
            data.update_customer_phone_number,
            data.update_customer_fine,
        ]);
        const [[rows]] = await db.query(query2, [data.update_customer_id]);

        console.log(`UPDATE Customers. ID: ${data.update_customer_id} ` +
            `Name: ${rows.first_name} ${rows.last_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/Customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/Media/update', async function (req, res) {
    try {
        const data = req.body;

        // Convert form values
        const mediaId = data.update_media_id;
        const isElectronic = data.update_media_is_electronic;
        const checkedOut = data.update_media_checked_out;    
        const mediaType = data.update_media_type;

        const query1 = 'CALL sp_UpdateMedia(?, ?, ?, ?);';
        const query2 = 'SELECT title, author_director_artist FROM Media WHERE id_media = ?;';

        await db.query(query1, [mediaId, isElectronic, checkedOut, mediaType]);

        const [[rows]] = await db.query(query2, [mediaId]);

        console.log(`Updated Media: ${rows.title} by ${rows.author_director_artist}`);
        res.redirect('/Media');
    } catch (err) {
        console.error('Error updating media:', err.message, err.stack);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/Media_Has_Genres/update', async function (req, res) {
    try {
        const data = req.body;

        const id = data.update_id;
        const new_genre = data.new_media_genre;
       
        const query1 = 'CALL sp_Update_MediaGenre(?, ?);';
        await db.query(query1, [id, new_genre]);

        res.redirect('/Media_Has_Genres');
    } catch (err) {
        console.error('Error updating media:', err.message, err.stack);
        res.status(500).send('Internal Server Error');
    }
});


// DELETE ROUTES
app.post('/Customers/delete', async function (req, res) {
    try {
        
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteCustomer(?);`;
        await db.query(query1, [data.delete_customer_id]);

        console.log(`DELETE Customers. ID: ${data.delete_customer_id} ` +
            `Name: ${data.delete_customer_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/Customers');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

        app.post('/Media/delete', async function (req, res) {   
    try {
        
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteMedia(?);`;
        await db.query(query1, [data.delete_media_id]);

        console.log(`DELETE Media. ID: ${data.delete_media_id} ` +
            `Item: ${data.delete_media_title}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/Media');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});
// The below code was enhanced with AI, specifically the syntax around generating the correct response when 
app.post('/Media_Has_Genres/delete', async function (req, res) {
    try {
        let data = req.body;

        console.log('Delete request received for:', data.delete_media_id, data.delete_genre_id);

        const query1 = `CALL sp_Delete_MediaGenre(?, ?);`;
        await db.query(query1, [data.delete_media_id, data.delete_genre_id]);

        const query2 = `SELECT title FROM Media WHERE id_media = ?;`;
        const query3 = `SELECT description FROM Genres WHERE id_genre = ?;`;

        const [mediaResult] = await db.query(query2, [data.delete_media_id]);
        const [genreResult] = await db.query(query3, [data.delete_genre_id]);

        const mediaTitle = mediaResult[0];
        const genreDescription = genreResult[0];

        console.log(`Deleted Media_Has_Genres: "${mediaTitle}" (ID: ${data.delete_media_id}), Genre: "${genreDescription}" (ID: ${data.delete_genre_id})`);

        res.redirect('/Media_Has_Genres');
    } catch (error) {
        console.error('Error executing queries:', error);

        if (error.code === 'ER_SIGNAL_EXCEPTION' && error.sqlState === '45000') {
            res.status(400).send(error.sqlMessage); // Send custom SQL error to user
        } else {
            
            

            res.status(500).send('An error occurred while executing the database queries.');
        }
    }
});


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log(
        'Express started on http://localhost:' +
            PORT +
            '; press Ctrl-C to terminate.'
    );
});