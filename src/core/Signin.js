import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "ammy@gmail.com",
    password: "ammy",
    error: false,
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/manager/dashboard" />;
      }
      else if (user && user.role === 2) {
        return <Redirect to="/doctor/dashboard" />;
      }
      else if (user && user.role === 3) {
        return <Redirect to="/admin/dashboard" />;
      }
      else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="offset-sm-3 col-md-6 text-left">
            <div className="alert alet-info">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signinForm = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">E-mail</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to Signin">
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
      {/* <p className="text-white text-center"> {JSON.stringify(values)} </p> */}
    </Base>
  );
};
export default Signin;