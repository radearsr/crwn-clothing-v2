import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/users.context";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormInput = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return alert("Password and Confirm Password Does't Match");
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormInput();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is existing");
      }
      console.log(error.code)
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleFormSignUp}>
        <FormInput 
          label="Display Name"
          type="text"
          onChange={onChangeHandler}
          name="displayName"
          value={displayName}
          required
        />
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
        <FormInput 
          label="Confirm Password"
          type="password"
          onChange={onChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit" >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
