import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  invert: "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.invert]: InvertedButton,
  }[buttonType]
)

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>
    {children}
    </CustomButton>
  )
};

export default Button;
