import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const MemberSignup = () => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    actions.postSignup(formData.email, formData.password);
  };

  return (
    <>
      {/* <Link 
        className="btn btn-primary" 
        data-bs-toggle="offcanvas" 
        href="#offcanvasExample" 
        role="button" 
        aria-controls="offcanvasExample">
        Link with href
      </Link>
      <button 
        className="btn btn-primary" 
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasExample" 
        aria-controls="offcanvasExample">
        Button with data-bs-target
      </button> */}
      
      <div 
        className="offcanvas offcanvas-start" 
        tabIndex="-1" 
        id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          {/* <div className="dropdown mt-3">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formEmail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="formEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="formPassword"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formConfirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="formConfirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Member Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};
