const jsftp = require("jsftp");
 import fs from 'fs/promises';

const Ftp = new jsftp({
  host: 'localhost',
  user: process.env.FTP_USER, // defaults to "anonymous"
  pass: process.env.FTP_PASSWORD, // default to "annonymous"
  debugMode: true
});

try {
    login();
}
catch(err) {
    console.log(err);
}

async function login() {
    return new Promise((resolve: any, reject: any) => {
        Ftp.auth(process.env.FTP_USER, process.env.FTP_PASSWORD, function(error: any) {
            if(error) {
                console.log(error);
                reject(error);
            }
            else {
                resolve();
            }
        });
    })
}


export async function upload(filePath: string, fileName: string) {
    try {
        let buffer = await fs.readFile(filePath);
        Ftp.put(buffer, fileName, (err: any) => {
            if (!err) {
                console.log("File transferred successfully!");
            }
            else {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}