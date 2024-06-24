import { useContext, useState } from "react";
import { Context } from "../main";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "./chat.css";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { ERROR_ROUTE } from "../utils/const";
import ShowMessages from "./ShowMessages";
import EmptyChat from "./EmptyChat";
function Chat() {
  const { app, firestore } = useContext(Context);
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [inputValue, setInputValue] = useState<string>("");
  let currentDay = "";
  const queryCommand = firestore.collection("message").orderBy("createdAt");
  const q = query(queryCommand);
  const [messages, loading] = useCollectionData(q);

  if (!messages && !user) {
    return <Navigate to={ERROR_ROUTE} />;
  }
  if (loading) {
    return <Loading />;
  }

  const sendMessage = async () => {
    firestore.collection("message").add({
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      text: inputValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputValue("");
  };
  return (
    <Container>
      <Grid
        style={{ height: window.innerHeight - 50 }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        {messages?.length&& messages.length > 0 ? (
          <ShowMessages
            messages={messages}
            currentDay={currentDay}
            user={user}
          />
        ) : (
          <EmptyChat />
        )}

        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={2}
            variant={"outlined"}
            value={inputValue}
            placeholder="Type a message ..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            onClick={() => sendMessage()}
            variant={"outlined"}
            style={{ marginTop: "2%" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
