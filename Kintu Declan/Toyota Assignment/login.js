//declare the libraries used.
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var crypto = require('crypto');

//declare the database
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	database : 'toyota'
});

var app = express();

//initialise the session.
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/templates/login.html'));
});

//app.use(express.static(path.join(__dirname , '/public')));

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/templates/register.html'));
});


app.get('/toyota', function(request, response) {
	response.sendFile(path.join(__dirname + '/templates/toyota.html'));
});



app.post("/register", (req, res) => {
	const username = req.body.username;
	const hash = req.body.password;
	const password = crypto.createHash('md5').update(hash).digest('hex');
	const email = req.body.email;
  
	const queryString =
	  "INSERT INTO `users` (`Usernames`, `Password`, `Email`) VALUES (?, ?, ?)";
	  connection.query(
	  queryString,
	  [username, password, email],
	  (err, result, field) => {
		if (err) {
		  console.log("an error has occured " + err);
		  res.status(500);
		  return;
		  
		}
		else { 
			res.redirect("/toyota");
		}
	  }
	);
  });
  
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var passwordData = request.body.password;
	var password = crypto.createHash('md5').update(passwordData).digest('hex');
	if (username && password) {
		connection.query('SELECT * FROM users WHERE Usernames = ? AND Password = ?', 
		[username, password], function(error, results, fields) {
			if (results.length > 0) {
				response.redirect('/toyota');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
						
			response.end();
		});
	}
});

// app.get('/auth', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.redirect('/toyota');
// 		response.sendFile(path.join(__dirname + '/toyota.html'));
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });


// app.post("/Toyota", (req, res) => {
// 	const customerID = req.body.cutomer_id;
// 	const name = req.body.name;
// 	const state = req.body.state;
// 	const retail = req.body.retail;
// 	const part = req.body.part_num;
// 	const description = req.body.description;
// 	const price = req.body.price;
// 	const quantity = req.body.quantity;
// 	const oversize = req.body.container;
// 	const shipping = req.body.shipping;
  
// 	const queryString =
// 	  "INSERT INTO `toyota` (`customerID`, `name`, `state`, `retail`, `part`, `description`, `price`, `quantity`, `container`, `shipping`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
// 	  connection.query(
// 	  queryString,
// 	  [customerID, name, state, retail, part, description, price, quantity, conatiner, shipping],
// 	  (err, result, field) => {
// 		if (err) {
// 		  console.log("an error has occured " + err);
// 		  res.status(500);
// 		  return;
// 		}
// 	  }
// 	);
//   });

app.listen(3000, () => {
	console.log('Server running on port 3000');
});	
