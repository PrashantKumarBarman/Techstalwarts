import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type props = {
    show: boolean
};

export default function SuccessModal(props: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setOpen(props.show);
  }, [props.show]);

  return (
    <div>
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Alert iconMapping={{success: <CheckCircleOutlineIcon fontSize="inherit" />, }} onClose={handleClose} >
                Deal agreement generated successfully
                </Alert>
            </Box>
        </Modal>
    </div>
  );
}


