import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import MoviesWatchlist from "./MoviesWatchlist"
import TvShowWatchlist from "./TVshowWatchlist"
import './style/search.css'

export default function Watchlist() {
  const [value, setValue] = React.useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{width: "100%", typography: "body1"}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab className='filterItem'  label='Movies' value='1' />
            <Tab className='filterItem' label='TV shows' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <MoviesWatchlist />
        </TabPanel>
        <TabPanel value='2'>
          <TvShowWatchlist />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
