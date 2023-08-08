import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormInput = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogleHandler = async () => {
    await signInWithGooglePopup();
  }

  const handleFormSignUp = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormInput();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("wrong password");
          break;
        case "auth/user-not-found":
          alert("no user associate with this email");
          break;
        default:
          console.log(error);
          break;
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleFormSignUp}>
        <FormInput 
          label="Email"
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={email}
          required
        />
        <FormInput 
          label="Password"
          type="password"
          onChange={onChangeHandler}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">
            Sign In
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogleHandler} >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
