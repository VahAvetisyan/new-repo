import * as React from "react"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
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

export default function SimpleSnackbar(props) {
  const { open, message, severity } = useSelector(selectSnackBarData)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(
      setSnackBarData({
        open: props.open,
        message: props.message,
        severity: props.severity
      })
    )
  }

  const handleClose = () => {
    dispatch(setSnackBarData({ open: false }))
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button variant="outlined" onClick={handleClick}>
        Sign Up{" "}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
