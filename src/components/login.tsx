import { FC } from "react";
import "../scss/login.scss";
import { useState } from "react";
import { IShippingField } from "../app.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  // блок валидаций с помощью Zod
  const emailValidation = z.string().email();
  const phoneValidation = z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "RU");
    return phoneNumber && phoneNumber.isValid();
  });
  const loginValidation = z.string().regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/);

  // объединяю проверки, можно добавить для пароля
  const formSchema = z.object({
    email: z.union([emailValidation, phoneValidation, loginValidation]),
    password: z.string(),
  });

  const handleMouseDown = () => {
    setShowPassword(true); // Show password when mouse button is pressed
  };

  const handleMouseUp = () => {
    setShowPassword(false); // Hide password when mouse button is released
  };

  const onSubmit: SubmitHandler<IShippingField> = (data) => {
    alert(`login ${data.email}\nPassword: ${data.password}`);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IShippingField>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="wrapper">
      <div className="login_box">
        <div className="login_header">
          <span>Login</span>
        </div>
        <div className="input_box">
          <input
            {...register("email")}
            type="text"
            id="user"
            className="input_field"
          />

          <label htmlFor="user" className="label">
            Login, mail or phone number
          </label>
          {errors?.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <i className="bx bx-user icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
            </svg>
          </i>
        </div>
        <div className="input_box">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"} // Show password if showPassword is true
            className="input_field"
            id="pass"
          />
          <i className="bx bx-user icon">
            <button
              type="button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="svg-btn-show"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="svg-show"
              >
                <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
              </svg>
            </button>
          </i>
          {errors?.password && <p className="error_message">{errors.password.message}</p>}

          <label htmlFor="pass" className="label">
            Password
          </label>
          <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="iput_box">
          <button disabled={!isValid}className="input_submit">Login</button>
        </div>
      </div>
    </form>
  );

  //   const handleRegisterClick = () => {
  //     const wrapper = document.querySelector(".wrapper");
  //     if (wrapper) {
  //       wrapper.classNameList.add("active");
  //     }
  //   };

  //   const handleLoginClick = () => {
  //     const wrapper = document.querySelector(".wrapper");
  //     if (wrapper) {
  //       wrapper.classNameList.remove("active");
  //     }
  //   };

  //   return (
  //     <div classNameName="mainWindow">
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //         <div classNameName="wrapper">
  //           <span classNameName="bg-animate"></span>
  //           <span classNameName="bg-animate2"></span>
  //           <div classNameName="form-box login">
  //             <h2
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 0,
  //                   "--j": 21,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               Login
  //             </h2>
  //             <div>
  //               <div
  //                 classNameName="input-box animation"
  //                 style={
  //                   {
  //                     "--i": 1,
  //                     "--j": 22,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <label classNameName="lablel-login" htmlFor="email">Email</label>
  //                 <input {...register("email")} type="text" id="email" />

  // {errors?.email && <div classNameName="error-message">{errors.email.message}</div>}
  //                 <i classNameName="bx bxs-envelope"></i>
  //               </div>
  //               <div
  //                 classNameName="input-box animation"
  //                 style={
  //                   {
  //                     "--i": 2,
  //                     "--j": 23,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <label classNameName="lablel-password" htmlFor="password">
  //                   Password
  //                 </label>

  //                 <input
  //                   {...register("password")}
  //                   type={showPassword ? "text" : "password"} // Show password if showPassword is true
  //                   classNameName="input-password"
  //                   id="password"
  //                 />
  //                 <button
  //                   type="button"
  //                   onMouseDown={handleMouseDown}
  //                   onMouseUp={handleMouseUp}
  //                   onMouseLeave={handleMouseUp}
  //                   classNameName="btn-show"
  //                 >
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="24"
  //                     height="24"
  //                     viewBox="0 0 24 24"
  //                     classNameName="svg-btn-show"
  //                   >
  //                     <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
  //                     <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
  //                   </svg>
  //                 </button>
  //                 {errors?.password && <p>{errors.password.message}</p>}

  //                 <i classNameName="bx bxs-lock-alt"></i>
  //               </div>

  //               {/* <button
  //                 type="submit"
  //                 classNameName="btn animation"
  //                 style={
  //                   {
  //                     "--i": 3,
  //                     "--j": 24,
  //                   } as React.CSSProperties
  //                 }
  //               >

  //               </button> */}

  //               <button
  //                 type="submit"
  //                 disabled={!isValid}
  //                 classNameName="btn animation"
  //                 style={
  //                   {
  //                     "--i": 3,
  //                     "--j": 24,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 login
  //               </button>
  //               <div
  //                 classNameName="logreg-link animation"
  //                 style={
  //                   {
  //                     "--i": 4,
  //                     "--j": 25,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <p>
  //                   Don't have an account?
  //                   <span onClick={handleRegisterClick} classNameName="register-link">
  //                     {" "}
  //                     Register
  //                   </span>
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div classNameName="info-text login">
  //             <h2
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 0,
  //                   "--j": 20,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               Don't have an account?
  //             </h2>
  //             <p
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 1,
  //                   "--j": 21,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <i
  //                 onClick={handleRegisterClick}
  //                 classNameName="bx bx-right-arrow-alt"
  //               ></i>
  //             </p>
  //           </div>
  //           <div classNameName="form-box register">
  //             <h2
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 17,
  //                   "--j": 0,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               Register
  //             </h2>
  //             <div>
  //               <div
  //                 classNameName="input-box animation"
  //                 style={
  //                   {
  //                     "--i": 18,
  //                     "--j": 1,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <input type="text" />
  //                 <label>Email</label>
  //                 <i classNameName="bx bxs-envelope"></i>
  //               </div>
  //               <div
  //                 classNameName="input-box animation "
  //                 style={
  //                   {
  //                     "--i": 19,
  //                     "--j": 2,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <input type="password" />
  //                 <label>Password</label>
  //                 <i classNameName="bx bxs-lock-alt"></i>
  //               </div>
  //               <button
  //                 type="submit"
  //                 classNameName="btn animation"
  //                 style={
  //                   {
  //                     "--i": 20,
  //                     "--j": 3,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 Register
  //               </button>
  //               <div
  //                 classNameName="logreg-link animation"
  //                 style={
  //                   {
  //                     "--i": 21,
  //                     "--j": 4,
  //                   } as React.CSSProperties
  //                 }
  //               >
  //                 <p>
  //                   Already have an account?
  //                   <span onClick={handleLoginClick} classNameName="login-link">
  //                     {" "}
  //                     Login
  //                   </span>
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div classNameName="info-text register animation">
  //             <h2
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 17,
  //                   "--j": 0,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               Already have an account?
  //             </h2>
  //             <p
  //               classNameName="animation"
  //               style={
  //                 {
  //                   "--i": 18,
  //                   "--j": 1,
  //                 } as React.CSSProperties
  //               }
  //             >
  //               <i
  //                 onClick={handleLoginClick}
  //                 classNameName="bx bx-left-arrow-alt"
  //               ></i>
  //             </p>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   );
};

export default LoginForm;
