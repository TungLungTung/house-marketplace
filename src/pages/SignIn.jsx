import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      /// SignInWithUserAndPassword return Promise
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate('/profile');
      }
    } catch (error) {
      /// Using Toastify
      toast.error('Bad user credentials');
      // console.log(error);
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back !</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Your password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="Show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot password
          </Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        {/* Googld OAuth */}

        <Link to="/sign-up" className="registerLink">
          Sign up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
