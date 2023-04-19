import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

const App = () => {

    const token = useSelector(state => state.auth.token)

}

export default App;
