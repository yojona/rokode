## Install
To install all dependencies, run the next command:
``
npm install
``

## Run server
Run the next command in the root dir
``node . ``
or
``npm start`` (to run with nodemon)

The app will run in **port 3000**

### Endpoints
| endpoint | type | data (required) | return |
|--|--|--|--|
| registro | post | <li>username</li><li>password</li> | <li>success: boolean </li><li>error: string or null </li> <li>ticketCode: string, only on success </li>
| validacion | post | <li>username</li><li>password</li> <li>ticketCode</li>| <li>success: boolean </li> <li>error: string or null </li>

### Database
This repo includes a **database.sql** file to import it in your Postgres Database.
