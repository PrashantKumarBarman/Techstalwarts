import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Sidebar() {
  let selectedStyle = { bgcolor: 'primary.main', color: 'white', borderRadius: '30px' };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%' }}>
      <nav aria-label="main mailbox folders" style={{ height: '100%' }}>
        <List sx={{ position: 'fixed', padding: '10px', height: '87%' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={selectedStyle}>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeOutlinedIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Deals" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ position: 'absolute', bottom: '10px' }}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
