import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { red, green, blue } from "@mui/material/colors";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    backgroundColor: red[500],
  },
  [theme.breakpoints.up("md")]: {
    width: blue[500],
  },
  [theme.breakpoints.up("lg")]: {
    border: green[900],
  },
}));

export default function MediaQuery() {
  return (
    <Root>
      <Typography>down(md): red</Typography>
      <Typography>up(md): blue</Typography>
      <Typography>up(lg): green</Typography>
    </Root>
  );
}
