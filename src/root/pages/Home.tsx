import Loader from "@/components/shared/Loader";
import PostCards from "@/components/shared/PostCards";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutions";


const Home = () => {
  console.log("renderd")

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } =  useGetRecentPosts();
  return (
    <div className="flex flex-1">
         <div className="home-container">
            <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {
              isErrorPosts && !posts ?
               (
                <Loader />
               ):(
                <ul className="grid 2xl:grid-cols-2 gap-6">
                  {posts && posts.map((post:any)=>{
                    return(
                      <li key={post.$id} className="flex justify-center w-full">
                        <PostCards post={post} />
                      </li>  

                    )
                

                  })}
                             
                </ul>
               )
            }

            </div>
         </div>
    </div>
  )
}

export default Home