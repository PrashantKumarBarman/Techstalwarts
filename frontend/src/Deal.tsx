import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DealType from '../types/deal';
import Grid from '@mui/material/Grid';
import { Party } from '../types/deal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@mui/icons-material/Close';

type DealProps = {
 deal: DealType|null,
 fileRef?: any,
 handleSubmit?: Function,
 cancelDeal?: Function
};

type PartyProps = {
    party: Party
};

type SubmitPropps = {
    handleSubmit?: Function,
    cancelDeal?: Function,
    deal: DealType|null
}

function shortDate(date: string) {
    if(date) {
        let d = new Date(date);
        const formattedDate = d.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');
        return formattedDate;
    }
}

function Deal({ deal, fileRef, handleSubmit, cancelDeal } : DealProps) : JSX.Element {
    return (
        <>
        <DealContainer deal={deal} fileRef={fileRef} />
        <Parties deal={deal} />
        <Submit handleSubmit={handleSubmit} cancelDeal={cancelDeal} deal={deal} />
        </>
    );
}

function Parties({ deal } : DealProps) : JSX.Element {
    return (
        <>
            <Typography variant='h6' className='text_color_main'>
            Parties Details
            </Typography>
            <Box sx={{ height: '57%', overflow: 'scroll' }}>
            {deal?.parties?.map((party) => {
                return (
                    <PartyComponent party={party} />
                )
            })}
            </Box>
        </>
    );
}

function PartyComponent({ party } : PartyProps) {
    return (
        <Card sx={{ m: 1 }}>
          <CardContent>
            <Grid container>
                <Grid item mt={1}>
                <AccountCircleIcon fontSize='large' color='primary' />
                </Grid>

                <Grid item>
                    <Grid container>
                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_main'>
                            {party.name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_main'>
                            {party.email}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_main'>
                            {party.mobile}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Type of Party
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {party.type}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Party Consultant Type
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {party.consultant_type}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Party Signatory Name
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {party.signatory_name}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Party Address
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {party.party_address}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Party Branch
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {party.branch}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
    );
}

function DealContainer({ deal, fileRef } : DealProps) {
    let [uploaded, setUploaded] = useState(false);
    let [fileName, setFileName] = useState<string>('');

    const handleFileUpload = (e: any) => {
        setFileName(e.target.files[0].name);
        setUploaded(true);
    };

    const removeFile = (e: any) => {
        setFileName('');
        setUploaded(false);
    };

    return (
        <Card sx={{ m: 1, height: '28%' }}>
          <CardContent>
            <Grid container>
                <Grid item m={1}>
                    <Typography variant='body1' className='text_color_light'>
                        Upload Excel Sheet
                    </Typography>
                    {
                    <input type="file" accept='.xls,.xlsx' ref={fileRef} onChange={handleFileUpload} hidden={uploaded ? true : false} />
                    }
                    {uploaded &&
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#9e9e9e', borderRadius: '20px' }} p={1}>
                        <FontAwesomeIcon icon={faFileExcel} style={{ color: 'green', margin: '5px' }} />
                        <Typography variant='body1' className='text_color_main'>{fileName}</Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={removeFile} />
                    </Box>}
                </Grid>

                <Grid item>
                    <Box m={1} p={1} sx={{ bgcolor: '#90caf9', borderRadius: '100px' }}>
                        <Typography variant='body1' textAlign={'center'} className='text_color_light'>
                            Deal ID
                        </Typography>
                        <Typography variant='body1' textAlign={'center'} color={'#03a9f4'}>
                            {deal?.id}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Grid container>
                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Product
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal?.product}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Agreement Date
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal ? shortDate(deal?.agreement_date) : null}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            State
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal?.state?.state}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Facility Letter Date
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal ? shortDate(deal?.facility_letter_date) : null}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Account Name
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal?.account_name}
                            </Typography>
                        </Grid>

                        <Grid item p={1}>
                            <Typography variant='body1' className='text_color_light'>
                            Sanction Letter Date
                            </Typography>
                            <Typography variant='body1' className='text_color_main'>
                            {deal ? shortDate(deal?.sanction_letter_date) : null}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item p={1}>
                    <Typography variant='body1' className='text_color_light'>
                        Details of receivable
                    </Typography>
                    <p style={{maxWidth: '250px'}} className='text_color_main'>
                    {deal?.details_of_receivable}
                    </p>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
}

function Submit({ handleSubmit, cancelDeal, deal } : SubmitPropps) {
    return (
        <Grid container>
            <Grid item sx={{ flexGrow: 1 }}></Grid>
            <Grid item m={1}>
                <Button variant='outlined' onClick={(e) => { if(cancelDeal) cancelDeal(e); }} disabled={(deal && deal.status === 'new') ? false : true}>Cancel Deal</Button>
            </Grid>
            <Grid item m={1} mr={2}>
                <Button variant='contained' onClick={(e) => { if(handleSubmit) handleSubmit(e); }} disabled={(deal && deal.status === 'new') ? false : true}>Generate Agreement</Button>
            </Grid>
        </Grid>
    );
}

export default Deal;