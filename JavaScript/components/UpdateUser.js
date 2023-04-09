import {useState} from "react";
import {useSelector} from "react-redux";

const UpdateUser = ({userType}) => {
    const token = useSelector(state => state.auth.token);
    const [email, setEmail] = useState('');
    const [successEmail, setSuccessEmail] = useState(null);
    const [successPassword, setSuccessPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const handleUpdateEmail = () => {
        fetch(`http://localhost:8080/api/${userType}/update-email/${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: (email)
            })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    setSuccessEmail('Email updated successfully!');
                } else {
                    throw new Error(response.statusText);
                }
            })
            .catch(error => {
                setErrorEmail(error.message);
            });
    }

    const handleUpdatePassword = (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorPassword("New password and confirm password do not match.");
            return;
        }

        fetch(`http://localhost:8080/api/${userType}/update-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            }),
        }).then((response) => {
            console.log(response)
            if (response.ok) {
                setSuccessPassword(true);
            } else {
                throw new Error(response.statusText);
            }
        })
            .catch((error) => {
                setErrorPassword("Failed to update password.");
                console.error(error);
            });
    }

    return (
        <>
            <div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email:"/>
                <button
                    style={{
                        marginRight: '10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}
                    onClick={handleUpdateEmail}>Update Email
                </button>
                {successEmail && <p>{successEmail}</p>}
                {errorEmail && <p>{errorEmail}</p>}
            </div>
            <div>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your password:"/>

                <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} placeholder="Confirm your password:"/>
                <label style={{
                    marginRight: '10px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }} htmlFor="confirmNewPassword"></label>
                <button
                    style={{
                        marginRight: '10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}
                    onClick={handleUpdatePassword}>Update new Password
                </button>
                {successPassword && <p>{successPassword}</p>}
                {errorPassword && <p>{errorPassword}</p>}
            </div>
        </>
    )
}
export default UpdateUser;
