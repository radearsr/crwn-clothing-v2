import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/users.context";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

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
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormInput();
    } catch (error) {
      console.log(error.code)
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
          <Button type="submit" >
            Sign In
          </Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogleHandler} >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
