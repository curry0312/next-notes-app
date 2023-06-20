"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import convertToBase64 from "@/utili/convertToBase64";
// import Image from "next/image";
// import avator from "@/public/avator.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { useSession } from "next-auth/react";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required!"),
  password: yup.string().required("password is required!"),
  username: yup.string().required("username is required!"),
});

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {data:session} = useSession()

  useEffect(()=>{
    if(session) push("/")
  },[session])

  // const [base64Image, setBase64Image] = useState<string>("");

  const { push } = useRouter();

  // async function onUpload(e: any) {
  //   const base64 = await convertToBase64(e.target.files[0]);
  //   setBase64Image(base64);
  // }

  async function onSubmit(formdata: any) {
    const { email, password, username, image } = formdata;
    console.log("formdata:",formdata);
    // let userImage;
    try {
      // if (!image[0]) {
      //   userImage = "";
      // } else {
      //   const imageInBase64 = await convertToBase64(image[0]);
      //   userImage = imageInBase64;
      // }
      await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uuidV4(),
          email,
          password,
          username,
          // image: userImage,
        }),
      });
      push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sm:flex sm:justify-center sm:items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:min-w-[60%] sm:min-h-[60%] min-h-screen mx-auto bg-green-500 px-4 py-4 flex flex-col gap-5"
      >
        <h1 className="text-5xl font-bold text-center">Register</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="input"
          />
          <div className="text-red-500">
            <ErrorMessage errors={errors} name="email" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            id="password"
            type="text"
            className="input"
          />
          <div className="text-red-500">
            <ErrorMessage errors={errors} name="password" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            {...register("username")}
            id="username"
            type="text"
            className="input"
          />
          <div className="text-red-500">
            <ErrorMessage errors={errors} name="username" />
          </div>
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="image">image:</label>
          <Image
            src={base64Image || avator}
            alt="user_image"
            width={100}
            height={100}
            priority
            className="object-cover self-center rounded-full"
          />
          <input
            {...register("image")}
            id="image"
            type="file"
            className="input"
            onChange={onUpload}
          />
        </div> */}
        <button className="bg-green-300 px-4 py-2 rounded-lg text-black font-bold sm:mt-auto hover:bg-green-600 hover:text-white duration-200 transtion ease-in-out">
          submit
        </button>
      </form>
    </div>
  );
}
