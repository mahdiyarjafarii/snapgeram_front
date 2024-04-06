import { z } from "zod"
 
export const SignupformSchema = z.object({

  name:z.string().min(2,{message:"string is short"}),
  username: z.string().min(2,{message:"string is short"}),
  email:z.string().min(8,{message:"string is short"}),
  password:z.string().min(8,{message:"Password must be latest at 8 charecter"}),
});


export const SigninformSchema = z.object({
  email:z.string().min(8,{message:"string is short"}),
  password:z.string().min(8,{message:"Password must be latest at 8 charecter"}),
})

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  image: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});