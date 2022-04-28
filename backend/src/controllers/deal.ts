import { Request, Response } from 'express';
import dealModel from '../models/deal';
import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import path from 'path';
import { upload } from '../lib/ftpClient';
let pdf = require('pdf-creator-node');

async function uploadDealAttachment(attachment: any) {
    try {
        let data = Buffer.from(attachment.data.split(',')[1], 'base64');
        let fileExtension =  attachment.extension;
        let fileName = nanoid() + '.' + fileExtension;
        let filePath = path.join(__dirname, '..', '..', 'media', fileName);
        await fs.writeFile(filePath, data);
        return fileName;
    }
    catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}

async function generateAgreementPDF(deal: any, fileName: string, attachment: string) {
    try {
        let html = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'agreement.html'));
        let filePath = path.join(__dirname, '..', '..', 'media', `${fileName}.pdf`);
        let document = {
            html: html.toString(),
            data: {
            deal: deal,
            attachment: attachment
            },
            path: filePath,
            type: "",
        };
        let result = await pdf.create(document, {});
        return { filePath: filePath, fileName: fileName };
    }
    catch(err: any) {
        console.log(err);
        throw new Error(err);
    }
}

export default {
    getDeal: async function(req: Request, res: Response) {
        try {
            res.status(200).json(await dealModel.getDeal());
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    generateAgreement: async function(req: Request, res: Response) {
        try {
            let attachment = '';
            let updateObj: any = {};
            if(req.body.attachment) {
                attachment = await uploadDealAttachment(req.body.attachment);
                updateObj['attachment'] = attachment;
            }
            let result = await generateAgreementPDF(req.body, req.body.id, attachment);
            // uploading pdf to ftp server
            await upload(result.filePath, `${result.fileName}.pdf`);
            updateObj['status'] = 'done';
            await dealModel.updateById(req.body.id, updateObj);
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    cancelDeal: async function(req: Request, res: Response) {
        try {   
            await dealModel.cancelDealById(Number(req.params.id));
            res.sendStatus(200);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}