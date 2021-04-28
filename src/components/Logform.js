import React, { useState } from "react";
import SignIn from "./Signin";
import SignUp from "./Signup";

const Logform = (props) => {
  const {
    handleLogin,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    clearErrors,
    setUser,
    handleSignup,
  } = props;
  const [check, setCheck] = useState(true);
  return (
    <>
      {check ? (
        <SignIn
          setEmail={setEmail}
          handleLogin={handleLogin}
          setPassword={setPassword}
          clearErrors={clearErrors}
          passwordError={passwordError}
          emailError={emailError}
          setUser={setUser}
          setCheck={setCheck}
          check={check}
        />
      ) : (
        <SignUp
          setCheck={setCheck}
          check={check}
          setEmail={setEmail}
          handleLogin={handleLogin}
          setPassword={setPassword}
          handleSignup={handleSignup}
        />
      )}
    </>
  );
};

export default Logform;
