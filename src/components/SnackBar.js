import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSnackBarData,
  setSnackBarData
} from "../redux/reducers/snackBarReducer"
import Stack from "@mui/material/Stack"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SimpleSnackbar() {
  const { open, message, severity } = useSelector(selectSnackBarData)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setSnackBarData({ open: false }))
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
