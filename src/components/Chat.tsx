import { useContext, useState } from "react";
import { Context } from "../main";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "./chat.css";
import Loading from "./Loading";
function Chat() {
  const { app, firestore } = useContext(Context);
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [inputValue, setInputValue] = useState<string>("");

  const queryCommand = firestore.collection("message").orderBy("createdAt");
  const q = query(queryCommand);
  const [messages, loading] = useCollectionData(q);

  if (loading) {
    return <Loading />;
  }
  const sendMessage = async () => {
    console.log(messages);

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
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid grey",
            overflowY: "auto",
          }}
        >
          {messages?.map((message, i) => (
            <div
              style={{
                marginLeft: message.uid === user?.uid ? "auto" : "10px",
                width: "fit-content",
                marginTop: "2%",
                padding: "2%",
                position: "relative",
              }}
            >
              <Grid
                container
                key={i}
                direction={user?.uid === message.uid ? "row-reverse" : "row"}
                alignItems={"flex-start"}
                gap={"1.2em"}
                wrap={"nowrap"}
              >
                <Avatar src={message.photoURL} />

                <div
                  className={`${
                    user?.uid === message.uid ? "chat" : "another-chat"
                  } chat-message`}
                >
                  {message.text}
                  <span className="chat-time">
                    {new Date(message?.createdAt?.seconds * 1000).getHours()}:
                    {new Date(message?.createdAt?.seconds * 1000).getMinutes()}
                  </span>
                </div>
              </Grid>
            </div>
          ))}
        </div>
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
