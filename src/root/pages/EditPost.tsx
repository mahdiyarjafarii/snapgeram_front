import PostForms from "@/components/forms/PostForms"
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutions";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );



  return (
    <div className="flex flex-1">
        <div className="common-container">
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
                <img
                    src="/assets/icons/add-post.svg"
                    width={36}
                    height={36}
                    alt="addpostIcons"
                />
               <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
            </div>
            {isLoading ? <Loader /> : <PostForms action="Update" post={post} />}

        </div>
    </div>
  )
}

export default EditPost