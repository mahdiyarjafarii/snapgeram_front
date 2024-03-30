import { z } from "zod"
 
export const SignupformSchema = z.object({

  name:z.string().min(2,{message:"string is short"}),
  username: z.string().min(2,{message:"string is short"}),
  email:z.string().min(8,{message:"string is short"}),
  password:z.string().min(8,{message:"Password must be latest at 8 charecter"}),
})