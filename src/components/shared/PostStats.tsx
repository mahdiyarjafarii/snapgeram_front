import { useDeleteLikePost, useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutions";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";



type PostStatsProps = {
    post: any;
    userId: string;
  };
const PostStats = ({ post, userId }: PostStatsProps) => {
   const location = useLocation();
   const likesList = post.likes

  const [likes, setLikes] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost,isPending:isLikeLoading } = useLikePost();
  const { mutate: deleteLikePost,isPending:isDislikeLoading } = useDeleteLikePost();

  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  

  const savedPostRecord = currentUser?.saved_posts.find(
    (record: any) => record.post_id  === post.post_id
  );
  const likedPostRecord = currentUser?.liked_posts.find(
    (record: any) => record.post_id  === post.post_id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
    setLikes(!!likedPostRecord)
  }, [currentUser]);


  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost({ userId: userId, postId: post.post_id });
    }

    savePost({ userId: userId, postId: post.post_id });
    setIsSaved(true);
  };

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (likedPostRecord) {
    setLikes(false);
      return deleteLikePost({ userId: userId, postId: post.post_id });
    }

    likePost({ userId: userId, postId: post.post_id });
    setLikes(true);
  };





const containerStyles = location.pathname.startsWith("/profile")
? "w-full"
: "";

    return (
        <div
          className={`flex justify-between items-center z-20 ${containerStyles}`}>
          <div className="flex gap-2 mr-5">
            <img
              src={`${
                likes
                  ? "/assets/icons/liked.svg"
                  : "/assets/icons/like.svg"
              }`}
              alt="like"
              width={20}
              height={20}
              onClick={(e) => handleLikePost(e)}
              className="cursor-pointer"
            />
            {isDislikeLoading || isLikeLoading ?(
                <Loader/>
            ):(

                <p className="small-medium lg:base-medium">{likesList.length}</p>
            )}
          </div>
    
          <div className="flex gap-2">
            <img
              src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
              alt="share"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={(e) => handleSavePost(e)}
            />
          </div>
        </div>
      );
}

export default PostStats