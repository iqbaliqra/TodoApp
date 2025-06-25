import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword ,sendEmailVerification,updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";


function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "bottom-center" });
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        await updateProfile(user, {
                   displayName: name,
 });

  
      if(user){
      toast.success("User Registered Successfully!", { position: "top-center" });
    
      await sendEmailVerification(user);
      toast.info("Verification email sent. Please check your inbox or spam.", { position: "top-center" });
      navigate("/login");
      }
  
    } catch (error) {
      console.error(error.message);
  
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in.", {
          position: "bottom-center",
        });
      } else {
        toast.error(error.message, { position: "bottom-center" });
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
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100 fw-bold mb-3">
            Create Account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-info fw-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
