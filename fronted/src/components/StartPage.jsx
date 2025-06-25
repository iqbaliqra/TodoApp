import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-dark text-secondary d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center px-4">
          <h1 className="display-4 fw-bold text-white animate__animated animate__bounceInLeft">Welcome to Todo App</h1>
          <p className="fs-5 my-4">
            Stay organized, boost your productivity, and never miss a task again.  
            Our simple and powerful Todo App helps you manage your daily goals with ease.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-outline-light btn-lg px-4 me-sm-3 fw-bold" onClick={()=>navigate("/login")}>
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-lg px-4 fw-bold"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartPage;
