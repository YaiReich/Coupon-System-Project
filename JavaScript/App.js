import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

const App = () => {

    const token = useSelector(state => state.auth.token)

    return (
        <div className="App">
            <NotificationContainer />
            <Routes>
                <Route path="/" element={token ? <Home /> : <Login />} />
            </Routes>
        </div>
    );
}

export default App;
