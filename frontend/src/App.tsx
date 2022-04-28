import './App.css';
import { useEffect, useState, useRef } from 'react';
import DealType from '../types/deal';
import Deal from './Deal';
import Sidebar from './Sidebar';
import Header from './Header';
import Grid from '@mui/material/Grid';
import SuccessModal from './SuccessModal';

function App() {
  let [deal, setDeal] = useState<DealType>({} as DealType);
  let formRef = useRef<any>();
  let fileRef = useRef<any>();
  let [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    fetchDeal();
  }, []);

  async function fetchDeal() {
    let result = await fetch('/deal');
    let deal: DealType = await result.json();
    setDeal(deal);
  }

  async function cancelDeal(e: any) {
    let result = await fetch(`/deal/cancel/${deal.id}`, {
      method: 'PUT'
    });
    if(result.status === 200) {
      setDeal({ ...deal, status: 'cancelled' });
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    let file = fileRef.current.files[0];
    if(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", function () {
        let fileExtension = file.name.split('.').pop();
        let requestData = { ...deal, attachment: { data: reader.result, extension: fileExtension }};
        console.log(requestData.attachment);
        generateAgreement(requestData);
      }, false);
    }
    else {
      generateAgreement(deal);
    }
  }

  async function generateAgreement(requestData: any) {
    let result = await fetch('/deal/agreement', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(result.status === 200) {
      setDeal({ ...deal, status: 'done' });
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
    }
  }

  return (
    <>
    {deal &&
    <form ref={formRef} style={{ height: '100%' }}>
    <Header dealStatus={deal ? deal.status : null} />
    <Grid container spacing={2} sx={{ height: '93%' }}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Deal deal={deal} fileRef={fileRef} handleSubmit={handleSubmit} cancelDeal={cancelDeal}></Deal>
        </Grid>
    </Grid>
    <SuccessModal show={showSuccessModal} />
    </form>
    }
    </>
  );
}

export default App;
