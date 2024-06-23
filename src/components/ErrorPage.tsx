import { useContext, useState } from "react";
import { Context } from "../main";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function ErrorPage() {
  const [warningMessage, setWarningMessage] = useState("");
  try {
    const { app } = useContext(Context);
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    setWarningMessage(user? "": "Something went wrong")
  } catch (error) {
    setWarningMessage("No internet connection!");
  }
  return (
    <div>
      <h1>{warningMessage}</h1>
    </div>
  );
}

export default ErrorPage;
