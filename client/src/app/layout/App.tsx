import {Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
  
  return (
    <>
    <CssBaseline/>
    <NavBar />
    <Container maxWidth='xl' sx={{mt: 3}}>
      <Outlet/>
    </Container>
    </>
  )
}

export default App
