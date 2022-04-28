const FtpSrv = require('ftp-srv');
import path from "path";

const port = 21;

const ftpServer = new FtpSrv({
    host: 'ftp://127.0.0.1:' + port,
    anonymous: false,
    whitelist: ['ls', 'put', 'PASV', 'USER', 'PASS', 'STOR', 'LIST'],
    pasv_url: 'ftp://127.0.0.1:' + port
});

ftpServer.on('login', (data: any, resolve: any, reject: any) => { 
    if(data.username === process.env.FTP_USER && data.password === process.env.FTP_PASSWORD){
        let ftpPath = path.join(__dirname, '..', '..', 'ftp');
        return resolve({ root: ftpPath });    
    }
    return reject(new Error('Invalid username or password'));
});

export function listen() {
    ftpServer.listen().then(() => { 
        console.log('Ftp server is starting...')
    });
}