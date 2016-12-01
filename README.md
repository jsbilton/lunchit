# lunchit

`npm start`
api directory (serving)
web directory (serving)

#Step 1: Auth0 Setup
Setting up Auth0 on site
Select Clients
Create a Client
Select Settings
Want to grab the Client Secret
In atom create `.env` file in api directory
.env `AUTH0_SECRET=client secret`

#Step 2: jwt-validate.js
`$ npm install dotenv -S`
`$ npm install express-jwt`
Require these in jwt-validate.js file
export jwt with the encoded secret

#Step 3: Set Up web .env
Grab the client ID and paste into .env file
**Don't forget to add middleware to our api manifest (JSON)**
Also in .env file we add our REACT_APP_API with our localhost
We will leverage a library called auth0-lock & save in our dependences and require this in the auth.js file. This gives the access to Auth0.
`$ npm install auth0-lock -S`
Grab the Client ID and Domain from Auth0 site and add them to .env: REACT_APP_ID & REACT_APP_DOMAIN
**Notice** we did NOT add the Client Secret here
In our auth.js file we are abstracting over localStorage. Reason being it gives us the option to change in one place rather than make many changes in our application

#Step 4: Match the auth
In our `app.js` file in our Match component, we use a render prop that takes a function to render the authenticated Home page
In our `auth.js` file, we create a do authentication function that will set our token based on the authentication provided
In our `data.js` file, we added setHeader to each of our CRUDL functions ``Bearer ${localStorage.getItem('id_token')}``


#Step Match When Authorized
In our `app.js`, we created the const `MatchWhenAuthorized`
We updated our Match component for authentication using `MatchWhenAuthorized`
The `MatchWhenAuthorized` is building a higher order component(a component we will go in and out of then render back out). This takes an object as an argument and destructures. We utilize a rest operator to put the rest of the arguments on the list into the rest object. (Rest is just really a series of things).
Next we create a Match component, where we put the rest of the arguments in the Match component then set a render prop equal to a function that takes props as an argument and returns the logged in method. Then renders a div with a logout button with a component the caller passed. If not, it redirects Home.


Work In-Progress...
