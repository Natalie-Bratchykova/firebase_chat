import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/const";
import { useContext } from "react";
import { Context } from "../main";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorPage from "./ErrorPage";
function AppRouter() {
  let user = null;
  try {
    const { app } = useContext(Context);
    const auth = getAuth(app);
    [user] = useAuthState(auth);
  } catch (error) {
    user = false;
  }

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, element }, i) => {
        return <Route key={i} path={path} Component={element} />;
      })}
      <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }, i) => {
        return <Route key={i} path={path} Component={element} />;
      })}
      <Route path="/error" Component={ErrorPage}/>
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
