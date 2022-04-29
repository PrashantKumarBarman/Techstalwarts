# Running instructions

- Project is written using Typescript with NodeJS
- Project structure

| Folder  | Description |
| ------------- | ------------- |
| backend  | Backend server code  |
| frontend  | Frontend server code, contains react app  |
| backend/src | Backend source typescript files |
| backend/dist | Backend NodeJS javascipt files generated for corresponding Typescript files in backend/src folder |
| .env | Files for storing environment variables |
| media | Folder to store uploaded deal attachment files(Excel) and generated agreement pdf files |
| ftp | Folder to store files uploaded to ftp server |

- Provide below environemnt variables in environment file present in backend folder

| Name | Description |
| ------------- | ------------- |
| MYSQL_USER | |
| MYSQL_PASSWORD | |
| MYSQL_DATABASE | |
| MYSQL_PORT | Default 3306 |
| PORT | Backend server port default is 8080 |
| FTP_USER | Ftp server user name | 
| FTP_PASSWORD | Ftp server user password |

- Open a new terminal
- cd into backend folder
- Import `techstalwarts.sql` file into Mysql, it contains the database
- Run `npm install`
- For running backend server in development mode run `npm run dev`
- For running backend server like regular/nodejs script use `nodemon dist/app.js` or `node dist/app.js`

- Open a new terminal
- cd into frontend folder
- run `npm install`
- Edit proxy property in `package.json` file with the backend server url, if backend server is running on other port than 8080
- Run `npm start` to start React frontend application, React app will run on port 3000
- After starting, React app is available at localhost:3000, open this in browser
