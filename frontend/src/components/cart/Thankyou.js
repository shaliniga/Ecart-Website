import { Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { validateShipping } from './Shipping';
import { useEffect } from 'react';

export default function Thankyou() {
    const { items, shippingInfo } = useSelector(state => state.cartState);
    const navigate = useNavigate();

    useEffect(() => {
        validateShipping(shippingInfo, navigate)

        // Send order data to backend for email
        const sendEmail = async () => {
            await fetch("/api/send-confirmation-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ shippingInfo, items }),
            });
        };

        sendEmail();
    }, [])

    return (
        <Fragment>
            <div className=" justify-content-between">
                <div className="mt-5 order-confirm">
                    <h2 className="mb-2">Your Order has been placed successfully. Thank You!</h2>
                    <h4 className="mb-3 mt-4">Shipping Info:</h4>
                    <p><b>Name:</b> {shippingInfo.fullName}</p>
                    <p><b>Phone:</b> {shippingInfo.phone}</p>
                    <p><b>Email</b> {shippingInfo.email}</p>
                    <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip}</p>

                    <hr />
                    <h4 className="mt-4">Order Summary:</h4>

                    <hr />
                    {items.map(item => (
                        <Fragment>
                            <div className="cart-item my-4 ">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.namme} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                    </div>
                                </div>

                            </div>

                        </Fragment>
                    ))}
                    <p><span className="order-summary-values">Total: ${items.reduce((acc, item) => (acc + item.quantity * item.price), 0)}</span></p>
                </div>
            </div>
        </Fragment>
    )
}