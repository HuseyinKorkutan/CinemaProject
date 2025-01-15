import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Container
} from '@mui/material';
import MovieManagement from './MovieManagement';
import ScreeningManagement from './ScreeningManagement';
import HallManagement from './HallManagement';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="admin panel tabs">
            <Tab label="Filmler" />
            <Tab label="Seanslar" />
            <Tab label="Salonlar" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <MovieManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <ScreeningManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <HallManagement />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPanel; 