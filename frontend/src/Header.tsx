import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type props = {
    dealStatus: string|null
};

const getDealText = (dealStatus: string|null) => {
  switch(dealStatus) {
    case 'new':
      return 'New';
    case 'cancelled':
      return 'Cancelled';
    case 'done':
      return 'Done';
    default:
      return 'New';
  }
}

const getDealBackgroundColor = (dealStatus: string|null) => {
  switch(dealStatus) {
    case 'new':
      return 'primary.main';
    case 'cancelled':
      return 'error.main';
    case 'done':
      return 'success.main';
    default:
      return 'primary.main';
  }
}

export default function Header(props: props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant='h6' style={{ color: 'grey' }} m={1}>Deal Status</Typography>
          <Typography variant='h6' sx={{ bgcolor: getDealBackgroundColor(props.dealStatus), borderRadius: '16px' }} m={1} pl={2} pr={2}>{getDealText(props.dealStatus)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
