//server.js
const http = require('http'),
      url = require('url'),
 
makeServer = function (request,response){
   let path = url.parse(request.url).pathname;
   console.log(path);
   if(path === '/'){
      response.writeHead(200,{'Content-Type':'text/plain'});
      response.write('Hello world');
   }
   else if(path === '/about'){
     response.writeHead(200,{'Content-Type':'text/plain'});
     response.write('About page');
   }
   else if(path === '/blog'){
     response.writeHead(200,{'Content-Type':'text/html'});
     response.write(`
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registration Form</title>
    </head>
    <body>
    <center>
    <fieldset>
        
        <!-- Label for the Heading of the Registration form -->
        <legend><h1>Registration Form</h1></legend> <br>
        
        <form name="my_form" action="post" onsubmit="return validate()" >
        
            <table>   
                
                <!-- Label for the user id input field -->
                <tr>
                    <td><label for="user_id">User id: </label></td>
                    <td><input type="text" name="user_id"><span id="user_id_error"></span></td>
                </tr>

                <!-- Label for the password input field -->
                <tr>
                    <td><label for="password">Password: </label></td>
                    <td><input type="password" name="password"><span id="password_error"></span></td>
                </tr>

                <!-- Label for the name input field -->
                <tr>
                    <td><label for="name">Name: </label></td>
                    <td><input type="text" name="name"><span id="name_error"></span></td>
                </tr>

                <!-- Label for the address input field -->
                <tr>
                    <td><label for="address">Address: </label></td>
                    <td><input type="address" name="address"><span id="address_error"></span></td>
                </tr>

                <!-- Label for the country input field -->
                <tr>
                    <td><label for</table></label>Country: </label></td>
                    <td>
                        <input type="text" name="country" list="country" placeholder="(Please select a country)"><span id="country_error"></span>
                        <datalist id="country">
                            <option>Uganda</option>
                            <option>Kenya</option>
                            <option>Rwanda</option>
                        </datalist>
                    </td>
                </tr>

                <!-- Label for the zip code input field -->
                <tr>
                    <td><label for="zip_code">ZIP Code: </label></td>
                    <td><input type="text" name="num"><span id="zip_code_error"></span></td>
                </tr>
            </form>
                <!-- Label for the email input field -->
                <tr>
                    <td><label for="mail">E-mail: </label></td>
                    <td><input type="text" name="email"><span id="email_error"></span></td>
                </tr>

                <!-- Label for the gender radio buttons -->
                <tr>
                    <td>
                        <label for="gender">Sex: </label>
                    </td>
                    <td>
                            <input type="radio" name="gender">
                            <label for="male">Male</label>
                            <input type="radio" name="gender">
                            <label for="male">Female</label>
                            <span id="gender_error"></span>
                    </td>
                </tr>

                <!-- Label for the Language check boxes -->
                <tr>
                    <td><label for="language">Language: </label></td>
                    <td>
                        <input type="checkbox" checked id="english" name="english" value="english">
                        <label for="english">English</label>

                        <input type="checkbox" name="non_english" value="non_english">
                        <label for="english">Non English</label><span id="language_error"></span>
                    </td>
                </tr>

                <!-- Label for about input field -->
                <tr>
                    <td><label for="msg">About:</label></td>
                    <td><textarea cols="30" rows="10" id="msg" name="user_message"></textarea></td>
                </tr>

                <!-- Submit button -->
                <tr colspan="3">
                    <td></td>
                    <td colspan="3"><input type="submit" value="submit"></td>
                </tr>
            </table>
    </form>
        </center>
    </fieldset>
</body>
</html>
     `);
   }
   else{
     response.writeHead(404,{'Content-Type':'text/plain'});
     response.write('Error page');
   }
   response.end();
 },
server = http.createServer(makeServer);
server.listen(3000,()=>{
 console.log('Node server created at port 3000');
});
