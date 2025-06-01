import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header(){
  const { items:cartItems } = useSelector(state => state.cartState)
    return(
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img width="150px" src="/images/logo.jpg" />
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <h2 className='pink'>"Unlock the Extraordinary with Ecart"</h2>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
    )
}