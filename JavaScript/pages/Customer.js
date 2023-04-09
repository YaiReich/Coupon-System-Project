import {useEffect, useState} from "react";
import CouponList from "../components/CouponList";
import {Button} from 'react-bootstrap';
import UpdateUser from "../components/UpdateUser";
import {useSelector} from "react-redux";

const Customer = ({token}) => {

    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([]);
    const reloaded = useSelector(state => state.reload);

    const [, updateVisibility] = useState(false)
    const [updateCompanyVisible, setUpdateCustomerVisible] = useState(false);

    const fetchCoupons = (token) => {
        setLoading(true)
        fetch(`http://localhost:8080/api/customer/all/purchased/${token}`)
            .then((response) => {
                if (response.ok)
                    return response.json()

                if (response.status === 404) {
                    throw new Error("Resource not found!")
                } else if (response.status === 500) {
                    throw new Error("Something bad happened!")
                }
            })
            .then((data) => {
                setCoupons(data)
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const fetchCouponsNotPurchased = (token) => {
        setLoading(true)
        fetch(`http://localhost:8080/api/customer/all/not-purchased/${token}`)
            .then((response) => {
                if (response.ok)
                    return response.json()

                if (response.status === 404) {
                    throw new Error("Resource not found!")
                } else if (response.status === 500) {
                    throw new Error("Something bad happened!")
                }
            })
            .then((data) => {
                setCoupons(data)
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    }


    let content = <h1>No Content.</h1>

    if (loading) {
        content = <h1>Loading...</h1>
    } else if (coupons.length > 0) {
        content = <CouponList coupons={coupons}/>
    }

    const toggleUpdateCustomerVisibility = () => {
        setUpdateCustomerVisible((prev) => !prev);
        updateVisibility(false);
    };

    useEffect(() => {
        fetchCouponsNotPurchased(token);
    }, [reloaded]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px'
        }}>
            <Button variant="outline-dark" style={{
                borderRadius: '20px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: '5px'
            }} onClick={() => {
                fetchCoupons(token)
            }}>Displaying all purchased coupons</Button>
            <Button variant="outline-dark" style={{
                borderRadius: '20px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: '5px'
            }} onClick={() => {
                fetchCouponsNotPurchased(token)
            }}>Displaying all not-purchased coupons</Button>

            {content}

            <Button variant="success" onClick={toggleUpdateCustomerVisibility} style={{margin: '20px'}}>
                update customer email and password
            </Button>
            {updateCompanyVisible && <UpdateUser type="1" userType="customer" token={token} style={{marginTop: '20px'}}/>}
        </div>
    )
}

export default Customer;
