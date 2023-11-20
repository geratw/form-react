import { FC } from "react";
import "../scss/login.scss";
import { useState } from "react";
import { IsShippingField } from "./app.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { SvgIcon } from "./SvgIcon";

const LoginForm: FC = () => {
  // для отслеживания состояния валидации для button
  const [showPassword, setShowPassword] = useState(false);

  // блок валидаций с помощью Zod и libphonenumber-js
  const emailValidation = z.string().email("Invalid value");
  const phoneValidation = z.string().refine((value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "RU");
    return phoneNumber && phoneNumber.isValid();
  }, "Invalid value");
  const loginValidation = z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Invalid value");

  const passwordValidation = z.string().refine((value) => value.trim() !== "", {
    message: "Сan't be empty and a space",
  });

  // создаю схему, объединяю проверки
  const formSchema = z.object({
    email: z.union([emailValidation, phoneValidation, loginValidation]),
    password: passwordValidation,
  });

  // функция, вызываемая при отправке формы
  const onSubmit: SubmitHandler<IsShippingField> = (data) => {
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    reset();
  };

  // инициализация хука формы с определенной схемой валидации
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IsShippingField>({
    mode: "all", // для валидации при всех изменениях
    resolver: zodResolver(formSchema), // для определения способа валидации формы
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
            placeholder="Enter login, email or phone number"
          />

          <label htmlFor="user" className="label">
            Login, email or phone number
          </label>
          <p className="error-message">{errors.email?.message || "\u00A0"}</p>
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
            placeholder="Enter password"
          />
          <i className="bx bx-user icon">
            <button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              className="svg-btn-show"
            >
              <SvgIcon id="password" />
            </button>
          </i>
          <p className="error-message">
            {errors.password?.message || "\u00A0"}
          </p>
          <label htmlFor="pass" className="label">
            Password
          </label>
          <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="iput_box">
          <button disabled={!isValid} className="input_submit">
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
