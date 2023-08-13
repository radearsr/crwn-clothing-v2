import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, CartItems, EmptyMessage }  from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (
            cartItems.map(item => <CartItem cartItem={item} key={item.name} />)
          ) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
