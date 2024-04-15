import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import "./LoginPage.css";
import { zodResolver } from '../../../node_modules/@hookform/resolvers/zod/src/zod';
import { getUser, login } from "../Services/userServices";
import { useLocation } from "react-router-dom";

const schema = z.object ({
  email: z.string().email({message: "Please enter valid email address"}).min(3),
  password: z.string().min(8 , {message: "Password must be at least 8 character long"})
})

const LoginPage = () => {
  const { register , handleSubmit , formState: {errors}} = useForm({resolver: zodResolver(schema)});
  const [formError , setFormError] = useState("")
  const location = useLocation();
  
  const onSubmit = async(formData) => {
    try {
      await login(formData);
      const {state} = location;

     window.location = state? state.from : "/";
    } catch (error) {
      if(error.response && error.response.status === 400){
        setFormError(error.response.data.message)
      }
    }
  }

  if(getUser()) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <section className="align_center form_loginpage">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>LoginForm</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_input_text"
              placeholder="Insert Email"
              //helps remove the previously inserted value when page refreshes
              {...register("email")}
            ></input>
            {errors.email && (<em className="form_error">{errors.email.message}</em>)}
            
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_input_text"
              placeholder="Insert Password"
              {...register("password")}
            ></input>
            {errors.password && (<em className="form_error">{errors.password.message}</em>)}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button className="search_button submit_btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
