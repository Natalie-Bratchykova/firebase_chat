import { AppBar, Avatar, Button, Grid, Toolbar } from "@mui/material";
import { useContext } from "react";
import { Context } from "../main";
import { useAuthState } from "react-firebase-hooks/auth";
import {  getAuth } from "firebase/auth";
import { redirect } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/const";

const Navbar = () => {
  let user = null;

  const { app } = useContext(Context);
  try {
    const auth = getAuth(app);
    [user] = useAuthState(auth);
  } catch (error) {
    user = null;
  }

  const logout = async () => {
    const auth = getAuth(app);
    await auth.signOut();
    user = null;
    redirect(LOGIN_ROUTE);
  };

  const login = () => {
    try {
      const { app } = useContext(Context);
      const auth = getAuth(app);
      [user] = useAuthState(auth);
      redirect(CHAT_ROUTE);
    } catch (error) {
      user = false;
    }
  };

  return (
    <AppBar color={"secondary"} position="static">
      <Toolbar>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          {user ? (
            <div>
              <Avatar src={user.photoURL || ""} />
              <h2>{user.displayName}</h2>
            </div>
          ) : (
            <div></div>
          )}
          {user ? (
            <Button
              onClick={() => logout()}
              style={{
                background: "transparent",
                borderColor: "white",
                color: "white",
              }}
              variant="outlined"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => login()}
              style={{
                background: "transparent",
                borderColor: "white",
                color: "white",
              }}
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
