import { useState } from "react";
import { IShippingField } from "./app.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import "./app.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function App() {
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

  const onSubmit: SubmitHandler<IShippingField> = (data) => {
    alert(`login ${data.email}\nPassword: ${data.password}`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" />
      {errors?.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        type={showPassword ? "text" : "password"} // Show password if showPassword is true
      />
      {errors?.password && <p>{errors.password.message}</p>}
      <button
        type="button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default App;
