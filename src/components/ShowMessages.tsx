import { Avatar, Grid } from "@mui/material";
import { User } from "firebase/auth";
import firebase from "firebase/compat/app";
import { FC } from "react";

interface showMessagesProps {
  messages: firebase.firestore.DocumentData[];
  currentDay: string;
  user: User | undefined | null;
}

const ShowMessages: FC<showMessagesProps> = ({
  messages,
  currentDay,
  user,
}) => {
  const getHours = (date: number) => new Date(date).getHours();
  const getMinutes = (date: number) => new Date(date).getMinutes();
  const getTime = (date: number) => `${getHours(date)}:${getMinutes(date)}`;
  const getFormattedDate = (date: number) => {
    if (date) {
      return new Intl.DateTimeFormat().format(new Date(date)).toString();
    } else {
      return "";
    }
  };
  return (
    <div
      style={{
        width: "80%",
        height: "70vh",
        border: "1px solid grey",
        overflowY: "auto",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {messages?.map((message, i) => {
        let displayMessage = false;
        if (message?.createdAt?.seconds) {
          const messageDate = getFormattedDate(
            message?.createdAt?.seconds * 1000
          );
          displayMessage = currentDay != messageDate;
          currentDay = messageDate;
        }

        return (
          <div
            key={i}
            className="chat-window"
            style={{
              marginLeft: message.uid === user?.uid ? "auto" : "10px",
              width: "100%",
              height: "fit-content",
              padding: ".7%",
            }}
          >
            {displayMessage && (
              <div
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "2",
                  display: "inline",
                  background:
                    "linear-gradient(90deg, rgba(159,3,51,0.4744748241093313) 0%, rgba(145,99,237,0.6481442918964461) 100%)",
                  padding: "1%",
                  width: "fit-content",
                  left: "50%",
                  marginLeft: "-50%",
                  borderRadius: ".4em",
                }}
              >
                {currentDay}
              </div>
            )}

            <Grid
              container
              key={i}
              direction={user?.uid === message.uid ? "row-reverse" : "row"}
              alignItems={"flex-start"}
              columnGap={"1.2em"}
              rowGap={"0"}
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
                  {getTime(message?.createdAt?.seconds * 1000)}
                </span>
              </div>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};

export default ShowMessages;
