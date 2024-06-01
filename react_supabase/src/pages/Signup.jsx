import { useState } from "react";
import { supabase } from "../client";
import "./style.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
const Signup = () => {
  sessionStorage.removeItem("token");
  const [formdata, setFormdata] = useState({
    full_name: "",
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
    e.preventDefault(); // Prevent form submission default behavior

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formdata.email,
        password: formdata.password,
        data: {
          full_name: formdata.full_name,
        },
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });

      if (!error) {
        // alert("Signup Successful! Please check your email to get verified.");
        console.log(data);
        const { data: userdata, error: usererror } = await supabase
          .from("users")
          .insert([{ full_name: formdata.full_name, email: formdata.email }]);
       if(!usererror){
        toast.success('You have signed up succesfully!🎉 Now check your email box for the verification link.', {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
         
          });
        console.log("logging user data---->",userdata)
       }
      } else {
        alert("Oops! Signup failed.");
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Sign Up</h2>
        <input
          type="text"
          name="full_name"
          placeholder="Enter your Full Name"
          onChange={handleChange}
          className="input"
        />
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
        <button type="submit" className="button">
          Sign Up
        </button>
      </form>
      <div className="footer-text">
        Already have an account? <Link to="/">Sign In</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
