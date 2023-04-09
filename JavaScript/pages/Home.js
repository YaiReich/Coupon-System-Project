import {useDispatch, useSelector} from "react-redux";
import {logout} from '../store/auth-slice'
import {Button} from 'reactstrap'
import Company from "./Company";
import Customer from "./Customer";
import 'react-notifications/lib/notifications.css';

const Home = () => {

    const token = useSelector(state => state.auth.token)
    const type = useSelector(state => state.auth.type)
    const dispatch = useDispatch()


    const handleLogout = () => {
        dispatch(logout())
    }


    return (
        <div style={{
            background: 'linear-gradient(45deg, rgb(60 199 127) 30%, rgb(8 18 185) 90%)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <h1 style={
                {
                    color: 'white',
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    textShadow: '2px 2px #888888'
                }
            }>Welcome home, you're logged in!</h1>
            <p style={{
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '2rem',
                textShadow: '2px 2px #888888'
            }}>Logout here:</p>
            <Button onClick={handleLogout} color="primary">Logout</Button>
            {type === 0 && <Customer token={token}/>}
            {type === 1 && <Company token={token}/>}

        </div>
    );
}

export default Home;
