import React, { useState } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    error: "",
    success: false
  });

  const { name, email, password, dob, gender, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, dob, gender })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          console.log(error);
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6 text-left">
          <form action="">
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">DOB</label>
              <input
                className="form-control"
                type="date"
                name="dob"
                placeholder="DOB"
                onChange={handleChange("dob")}
                value={dob}
              />
            </div>
            <div class="form-group">
              <label for="sel1">Gender</label>
              <select class="form-control" id="sel1" name="dob"
                required
                onChange={handleChange("gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male"  >Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="text-light">E-mail</label>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange("password")}
                value={password}
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="offset-sm-3 col-md-6 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully!!.Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <Base title="Sign up page" description="A page for user to signup">
      {successMessage()}
      {errorMessage()}
      {signupForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};
export default Signup;
