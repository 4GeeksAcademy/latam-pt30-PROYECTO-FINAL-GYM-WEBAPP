import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const MemberSignup = () => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  //const [image, setImage] = useState("")

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

  // const handleUploadImage = async (e) => {
  //   const response = await actions.imageUpload(e.target.files[0])
  //   if (response){
  //     console.log(response);
  //     setFormData({ ...formData, image: response.secure_url })
  //   }
  // }

  return (
    <>
      <div 
        className="offcanvas offcanvas-start" 
        tabIndex="-1" 
        id="offcanvasExample" 
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header alert alert-primary">
          <h1 className="offcanvas-title text-light" id="offcanvasExampleLabel">Member SignUp</h1>
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"></button>
        </div>
        <div className="offcanvas-body alert alert-primary text-light">
          <h2>
            You are about to go to the next level Tracking your improvements 🤳
          </h2>
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
          <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
              {/* <label htmlFor="uploadImage" className="form-label mt-3">Profile Picture</label>
              <img 
                className="d-block mb-2 rounded-circle" 
                width={80}
                src={formData.image} 
              />
              <input 
                type="file" 
                className="filepond mb-3 border-warning-subtle"
                id="uploadImage"
                name="memberImage"
                value={formData.member_image}
                onChange={handleUploadImage}
                accept="image/png, image/jpeg, image/gif"
              /> */}
              <label htmlFor="formEmail" className="form-label mt-4">Email address</label>
              <input
                type="email"
                className="form-control border-warning-subtle"
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
                className="form-control border-warning-subtle"
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
                className="form-control border-warning-subtle"
                id="formConfirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-warning">Member Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};
