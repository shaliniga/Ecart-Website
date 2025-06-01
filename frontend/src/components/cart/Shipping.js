import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export const validateShipping = (shippingInfo, navigate) => {
   
    if(
        !shippingInfo.fullName||
        !shippingInfo.phone||
        !shippingInfo.email|| 
        !shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.zip
        ) {
            navigate('/shipping')
    }
} 

export default function Checkout() {
    const { shippingInfo = {} } = useSelector(state => state.cartState);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({fullName,email,phone,address,city,zip}))
        navigate('/order/confirm')
    };

    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-4">Checkout Page</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                pattern="^\d{10}$"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="zip_field">Zip Code</label>
                            <input
                                type="text"
                                id="zip_field"
                                className="form-control"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                pattern="^\d{5,6}$"
                                required
                            />
                        </div>

                        <hr />

                        <h4 className="mb-3">Payment Info</h4>

                        <div className="form-group">
                            <label htmlFor="card_number_field">Card Number</label>
                            <input
                                type="text"
                                id="card_number_field"
                                className="form-control"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                pattern="^\d{16}$"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expiry_field">Expiry Date</label>
                            <input
                                type="month"
                                id="expiry_field"
                                className="form-control"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                min={new Date().toISOString().slice(0, 7)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv_field">CVV</label>
                            <input
                                type="text"
                                id="cvv_field"
                                className="form-control"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                pattern="^\d{3}$"
                                required
                            />
                        </div>

                        <button
                            id="checkout_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            PLACE ORDER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
