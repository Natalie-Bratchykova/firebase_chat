import { Grid, Container, Box, Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../main";
import firebase from "firebase/compat/app";
function Login() {
  const { auth } = useContext(Context);
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };
  return (
    <Container>
      <Grid
        style={{ height: window.innerHeight - 50 }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid>
          <Box p={5}>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => login()}
            >
              Login with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
