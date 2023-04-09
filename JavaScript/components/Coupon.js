import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {reload} from "../store/reloadSlice";
import {useState, useEffect} from "react";
import "./Coupon.css";
import { NotificationManager } from "react-notifications";

const Coupon = ({id, title, price, text, imageUrl, endDate, startDate, couponUuid}) => {

    const token = useSelector(state => state.auth.token)
    const userType = useSelector((state) => state.auth.type);

    const dispatch = useDispatch();

    const [expiresSoon, setExpiresSoon] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingDays = Math.ceil(
                (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
            );
            setExpiresSoon(remainingDays < 8 && remainingDays > 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [endDate]);


    const handlePurchase = () => {
        fetch(`http://localhost:8080/api/customer/purchase/${token}/${couponUuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then((response) => {
                console.log('Response status:', response.status);
                if (response.ok) {
                    if (response.status === 204) {
                        dispatch(reload())
                        console.log('Coupon purchased successfully');
                    } else {
                        return response.json
                    }
                } else {
                    console.error('Failed to purchase coupon');
                }
            })
            .then((data) => {
                if (data !== undefined) {
                    console.log('Response data:', data);
                    console.log('Coupon purchased successfully:', data);
                }
            })
            .catch(error => {
                console.error('Error purchasing coupon:', error);
            });
    };


    const handleDelete = () => {
        fetch(`http://localhost:8080/api/company/delete/${token}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    dispatch(reload())
                    console.log("Type:", userType);
                    NotificationManager.success('Coupon deleted successfully', 'Success', 3000);
                } else {
                    console.error('Failed to delete coupon');
                }
            })
            .catch(error => {
                console.error('Error deleting coupon:', error);
                NotificationManager.error('Failed to delete coupon', 'Error', 3000);
            });
    };


    return (<Card
            style={{
                width: '18rem',
                display: 'flex',
                textAlign: 'center',
                margin: '8px',
                borderRadius: 35,
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={imageUrl} alt={title} style={{width: '200px', height: '200px'}}/>
            </div>
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    ₪ {price}
                </CardSubtitle>
                <CardText>{text}</CardText>
                <CardText>Start Date: {startDate}</CardText>
                <CardText>
                    <span className={expiresSoon ? "blink" : ""}>
                        Expiry Date:{" "}{endDate}
                    </span>
                </CardText>

                {userType === 0 && <button onClick={handlePurchase}>Purchase</button>}
                {userType === 1 && <button onClick={handleDelete}>Delete</button>}
            </CardBody>
        </Card>
    )
}

export default Coupon;
