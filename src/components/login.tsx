import { FC } from "react";
import "../scss/login.scss";
import { useState } from "react";
import { IShippingField } from "./app.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { SvgIcon } from "./SvgIcon";

const LoginForm: FC = () => {
  // для отслеживания состояния валидации для button
  const [showPassword, setShowPassword] = useState(false);

  // блок валидаций с помощью Zod
  const emailValidation = z.string().email("Invalid value");
  const phoneValidation = z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "RU");
    return phoneNumber && phoneNumber.isValid();
  }, "Invalid value");
  const loginValidation = z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid value");

  // объединяю проверки, можно добавить для пароля
  const formSchema = z.object({
    email: z.union([emailValidation, phoneValidation, loginValidation]),
    password: z.string(),
  });

  // для просмотра пароля
  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const onSubmit: SubmitHandler<IShippingField> = (data) => {
    console.log(`login:${data.email}\nPassword:${data.password}`);
    reset();
  };

  //  инициализация хука формы с определенной схемой валидации
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
          <div className="div_error_message">
            <p className="error-message">{errors.email?.message || "\u00A0"}</p>
          </div>

          <i className="bx bx-user icon">
            <SvgIcon id="user" />
          </i>
        </div>
        <div className="input_box">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
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
              <SvgIcon id="password" />
            </button>
          </i>

          <div className="div_error_message">
            <p className="error-message">
              {errors.password?.message || "\u00A0"}
            </p>
          </div>
          <label htmlFor="pass" className="label">
            Password
          </label>
          <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="iput_box">
          <button disabled={!isValid} className="input_submit">
            Sing in
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
