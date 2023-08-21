import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.slice";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const addProductToCart = () => (
    dispatch(addItemToCart(product))
  );

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.invert} onClick={addProductToCart}>Add To Cart</Button>
    </div>
  )
}

export default ProductCard;
