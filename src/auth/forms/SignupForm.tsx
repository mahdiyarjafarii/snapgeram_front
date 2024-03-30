import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {SignupformSchema} from './../../lib/validation/index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Loader from './../../components/shared/Loader'
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutions";




const SignupForm = () => {

  const { toast } = useToast();
  const {mutateAsync:createUserAccount,isPending:isLoading}=useCreateUserAccount();
  const {mutateAsync:signInaccount,isPending:isSignIn}=useSignInAccount();
  

  const form = useForm<z.infer<typeof SignupformSchema>>({
    resolver: zodResolver(SignupformSchema),
    defaultValues: {
      name:'',
      username: '',
      email:'',
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupformSchema>) {
    const newUser= await createUserAccount(values);
    if(!newUser){
      return  toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    };

    const token= await signInaccount({
      email:values.email,
      password:values.password
    });
    if(!token){
      return  toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }

    console.log(values)
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 md:base-regular">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use Snapgeram enter your details</p>
      

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password"  className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isLoading?(
           <div className="flex-center gap-2 ">
            <Loader/> Loading...
           </div>
          ):(
            "Sign Up"
          )}
          
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2 ">
          Already have an account?
          <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">Log In</Link>

        </p>


      </form>
      </div>
    </Form>
  )
}

export default SignupForm