import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Profile from "./Profile"
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import Watchlist from './Watchlist';
import History from './History';

export default function TabsVertical() {
  return (
    <div>
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        sx={{ minWidth: 300, borderRadius: "lg", background: "#c6e0bf" }}
      >
        <TabList>
          <Tab>
            <PersonIcon />
            Profile
          </Tab>
          <Tab>
            <FavoriteIcon />
            Favorite
          </Tab>
          <Tab>
            <HistoryIcon />
            History
          </Tab>
        </TabList>
        <TabPanel sx={{ p: 2, minHeight: 200 }}>
          <Profile />
        </TabPanel>
        <TabPanel value={1} sx={{ p: 2, minHeight: 200 }}>
          <Watchlist />
        </TabPanel>
        <TabPanel value={2} sx={{ p: 2, minHeight: 200 }}>
          <History />
        </TabPanel>
      </Tabs>
    </div>
  );
}
