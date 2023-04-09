import Coupon from "./Coupon";

const CouponList = ({coupons}) => {

    return (
        <div style={{
            marginTop: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }}>
            {coupons.map((coupon) => {
                return <Coupon id={coupon.id}
                               title={coupon.title}
                               price={coupon.price}
                               text={coupon.description}
                               imageUrl={coupon.imageUrl}
                               startDate={coupon.startDate}
                               endDate={coupon.endDate}
                               couponUuid={coupon.uuid}
                               />
            })}
        </div>
    );
}

export default CouponList;
