import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import {auth} from "./firebase"; 
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
     try {
        const{email, password} = formData;
        const userCredential = await signInWithEmailAndPassword(auth,email, password);
        const user = userCredential.user;
           
        if(user){
          console.log("Username:",user.displayName);
          localStorage.setItem("UserProfile", JSON.stringify({
  displayName: user.displayName,
  email: user.email
}))
        toast.success("Login successful!", { position: "top-center" });
       navigate('/dashboard')

      }
             
        

        
     } catch (error) {
        console.error("Login failed:", error.message);
        if(error.code === "auth/user-not-found") {

        toast.error("Login failed. Please check your credentials.", {
            position: "bottom-center",
            });
        }
        else if (error.code === "auth/wrong-password") {
            toast.error("Incorrect password.", { position: "bottom-center" });
          } 
          else {
            toast.error(error.message, { position: "bottom-center" });
          }
     }
    
    setFormData({
      email: "",
      password: "",
      remember: false
    });
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    const { email } = formData;
  
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox or spam.", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error in password reset:", error.message);
  
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email address.", {
          position: "bottom-center",
        });
      } else if (error.code === "auth/missing-email") {
        toast.error("Please enter your email address.", {
          position: "bottom-center",
        });
      } else {
        toast.error("An error occurred while resetting the password.", {
          position: "bottom-center",
        });
      }
    }
  };
  

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow-lg bg-dark text-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-info w-100 fw-bold mb-3">
            Login
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-info fw-bold">Sign Up</Link>
          </p>
          <p className="text-center">
            <Link to="/forgot-password" className="text-light" onClick={handlePassword}>Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
