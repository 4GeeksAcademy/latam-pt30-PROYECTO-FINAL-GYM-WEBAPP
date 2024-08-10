import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await actions.postLogin(email, password);
    const response = localStorage.getItem('accessToken');
    if (response != "") {
      console.log("VALOR DE store.user.id ****:", store.user.id);
      console.log("VALOR DE LOCALSTORAGE despues de la condición *** ", localStorage.getItem('accessID'))
      // navigate(`/private/${store.id}`)
      navigate("/dashboard")
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="card border-success text-light col-10 mx-auto my-5 p-5">
      <h1 className="d-flex justify-content-center display-3">LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Keep me logged in</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};
