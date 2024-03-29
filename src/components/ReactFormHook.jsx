import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ReactFormHook = () => {
  const validate = yup.object({
    fullName: yup.string().max(10, "長度不得超過10").required("欄位不得為空"),
    email: yup.string().email("電子郵件格式有誤").required("欄位不得為空"),
    age: yup.number().min(1, "年齡不得小於1").required("欄位不得為空"),
    password: yup.string().min(6).required("欄位不得為空"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "密碼輸入不一致"),
  });

  const {
    register, // 取得input value
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate),
  });

  const onSubmit = (values)=>{
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full Name..." {...register("fullName")} />
      <input type="text" placeholder="Email..." {...register("email")} />
      {errors?.email && <p>{errors?.email?.message}</p>}
      <input type="number" placeholder="Age..." {...register("age")} />
      <input
        type="password"
        placeholder="Password..."
        {...register("password")}
      />
      <input
        type="password"
        placeholder="Confirm Password..."
        {...register("confirmPassword")}
      />

      <input type="submit" value="submit" />
    </form>
  );
};

export default ReactFormHook;
