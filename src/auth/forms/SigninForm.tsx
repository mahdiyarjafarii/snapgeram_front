import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {SigninformSchema} from './../../lib/validation/index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from './../../components/shared/Loader'
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutions";
import { useUserContext } from "@/context/AuthContext";




const SignupForm = () => {
  let navigate = useNavigate();
  const { toast } = useToast();
  
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const {mutateAsync:signInaccount,isPending:isSigningInUser}=useSignInAccount();
  

  const form = useForm<z.infer<typeof SigninformSchema>>({
    resolver: zodResolver(SigninformSchema),
    defaultValues: {
      email:'',
      password:''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninformSchema>) {

    try{


      const token= await signInaccount({
        email:values.email,
        password:values.password
      });
      if (!token) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate('/sign-in');
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
      
    }catch(error){
      console.log({ error });
    }
   
  };

  
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 md:base-regular">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular">Welcome back! Please enter your details.</p>
      

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
          {isSigningInUser || isUserLoading ? (
           <div className="flex-center gap-2 ">
            <Loader/> Loading...
           </div>
          ):(
            "Sign In"
          )}
          
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>


      </form>
      </div>
    </Form>
  )
}

export default SignupForm