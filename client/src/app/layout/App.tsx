import {Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  
  return (
    <>
    <CssBaseline/>
    <NavBar />
    <Container maxWidth='xl' sx={{pt:14}}>
      <Outlet/>
    </Container>
    </>
  )
}

export default App
