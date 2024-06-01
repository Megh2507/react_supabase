import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
import './style.css'; // Import the CSS file
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
const Signin = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    e.preventDefault();
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    sessionStorage.removeItem("token")
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formdata.email,
        password: formdata.password,
      });

      if (!error) {
        toast.success('Signed In Successfully!', {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
            });
        console.log(data);
        sessionStorage.setItem("token", JSON.stringify(data));
        navigate("/homepage");
      } else {
        alert("Oops! Signin failed.");
        console.log(error);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Sign In</h2>
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">Sign In</button>
      </form>
      <div className="footer-text">
        Dont have an account? <Link to="/signup">Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
