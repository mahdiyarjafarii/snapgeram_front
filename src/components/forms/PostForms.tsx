import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutions";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

type PostFormProps = {
  post?: any;
  action?: string;
};

 


function PostForms({post,action}:PostFormProps) {
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
  useCreatePost();
const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
  useUpdatePost();
  const { user } = useUserContext();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      image: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });


 async function onSubmit(values: z.infer<typeof PostValidation>) {
  try{

    if (post && action === "Update") {

      const updatedPost = await updatePost({
        ...values,
        post_id: post.post_id,
        imageUrl: post.imageUrl,
       
      });
  
      if (!updatedPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      return navigate(`/posts/${post.post_id}`);
    }
  
      const newPost= await createPost({
        ...values,
        creator_id:user.id
      });
      if(!newPost){
        toast({
          title: `created post failed. Please try again.`,
        });
        return
      };
      return navigate('/');
  
  }catch(error){
    console.log(error)
  }


  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
              <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
               <Input type="text" className="shad-input"  {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
 <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end items-center">
        <Button 
        className="shad-button_dark_4"
        type="button">
            Cancel
        </Button>
        <Button
         disabled={isLoadingCreate || isLoadingUpdate}
         className="shad-button_primary whitespace-nowrap"
         type="submit">
          {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
        </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForms