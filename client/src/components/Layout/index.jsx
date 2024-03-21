import './Layout.css';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

const Layout = ({ children }) => {
  const { cart, isCartLoading, dispatch } = useCartContext();

  if (isCartLoading) return <div>Loading...</div>;

  return (
    <div className="layout">
      {/* Add your layout structure here */}
      <nav className="layout__nav">
        <div className="layout__nav__left">
          <Link to="/">Home</Link>
        </div>

        <div className="layout__nav__right">
          <Link to="/cart">Cart ({cart.items.length})</Link>
        </div>
      </nav>

      <main className="layout__children">{children}</main>
      <footer className="layout__footer">
        &copy; {new Date().getFullYear()} Michaels
      </footer>
    </div>
  );
};

export default Layout;
