# Express JSON Controller

Express based Router-Controller middleware. This expects on a JSON file named 'route-map.json', where the routes are configured along with the controllers and methods.
It also deals with security aspect of the application as well. In case you want to use header based tokens and a validator method for verifying, you simply have to provide 
```
"secured": true
```
for the route-method. This is will make application to check for the headers and execute the validator before proceeding to the corresponding controller.
## route-map.json:
route-map.json
```sh
{
    "name": "<APP-NAME>",
    "version": "1.0.1",
    "controllerPath": "controllers", // PATH OF THE CONTROLLER DIRECTORY    
    "basePath": "/api", // END-POINT BASE PATH
    "securityHeader": "Bearer",
    "routes":{
        "/healthcheck/:id":{
            "controller": "healthcheck", // CONTROLLER NAME
            "methods": {
                "GET": { // CONTROLLER METHOD
                    "methodId": "checkServerHealth", // EXPORTED METHOD NAME
                    "description": "Checking if the server is reachable or not."
                }
            }
        },
        "/auth/login":{
            "controller": "authentication",
            "bodyParser": true,
            "methods": {
                "POST": {
                    "secured": true, // FOR SECURITY VALIDATION
                    "methodId": "fbAuthVerify",
                    "description": "Authenticates a FB user and generates the token based on the USER UID."
                }
            }
        }
    }
}
```
## Using as middleware
```
const expressJson = require('express-json-controller').default;
const express = require('express');
const authHandler = require('../helpers/auth-handler');
const app = express();
new expressJson(app, {basePath: './src'}, (middleWare)=> {
    middleWare.setSecurityHandler({'Bearer': authHandler.verifyToken}); // HEADER TO LOOK FOR + VALIDATOR METHOD
})
```
As of now it doesn't provide any editor support for edit and update the routes.


