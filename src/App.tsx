import { useState } from "react";
import { IShippingField } from "./app.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import "./app.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import LoginForm from "./components/login";

function App() {
  

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("email")} type="text" />
    //   {errors?.email && <p>{errors.email.message}</p>}
    //   <input
    //     {...register("password")}
    //     type={showPassword ? "text" : "password"} // Show password if showPassword is true
    //   />
    //   {errors?.password && <p>{errors.password.message}</p>}
    //   <button
    //     type="button"
    //     onMouseDown={handleMouseDown}
    //     onMouseUp={handleMouseUp}
    //     onMouseLeave={handleMouseUp}
    //   >
    //     {showPassword ? "Hide Password" : "Show Password"}
    //   </button>

    //   <button type="submit" disabled={!isValid}>
    //     Submit
    //   </button>
    // </form>
    <LoginForm />
  );
}

export default App;
