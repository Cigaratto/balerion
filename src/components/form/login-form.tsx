"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth-context";


export function LoginForm() {


  const { login } = useAuth();
  const schema = z.object({
    username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้" }),
    password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }),
  });

  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    login(data.username, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center h-screen">
        <h1 className="text-2xl md:text-[32px] text-white">เข้าสู่ระบบ</h1>
        <p className="text-xs text-white pt-2.5 md:pt-5 pb-3">บัญชีพนักงาน</p>
        <Input
          {...register("username")}
          className=" text-white bg-[#393937] border-0 rounded-xl w-[222px] md:w-[313px] h-[42px]"
          type="text"
          placeholder=""
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <p className="text-xs text-white pt-2.5 md:pt-5 pb-3">รหัสผ่าน</p>
        <Input
          {...register("password")}
          className="text-white bg-[#393937] border-0 rounded-xl w-[222px] md:w-[313px] h-[42px]"
          type="password"
          placeholder=""
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button
          className="mt-5 text-[#11181C] bg-white w-[222px] md:w-[313px] h-[43px] hover:bg-gray-300"
          type="submit"
          disabled={isSubmitting}
        >
          ยืนยัน
        </Button>
      </div>
    </form>
  );
}
