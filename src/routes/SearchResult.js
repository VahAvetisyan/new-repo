import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MoviesSearchResult from "./MoviesSearchResult"
import TvShowsSearchResult from "./TvShowsSearchResult"
import "./style/search.css"
import ActorSearchResult from "./ActorSearchResult"

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  }
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div style={{ display: "grid"}} id="searchFilter">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          className="filterItem"
          label="Movies"
          {...a11yProps(0)}
          sx={{ color: "black"}}
        />
        <Tab
          className="filterItem"
          label="TV SHOWS"
          {...a11yProps(1)}
          sx={{ color: "black" }}
        />
        <Tab
          className="filterItem"
          label="Actors"
          {...a11yProps(2)}
          sx={{ color: "black" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MoviesSearchResult />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TvShowsSearchResult />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ActorSearchResult />
      </TabPanel>
    </div>
  );
}
