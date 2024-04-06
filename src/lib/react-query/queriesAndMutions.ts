import {

useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import { INewPost, INewUser } from 'types';
import { createPost, createUserAccount, getRecentPosts, signInAccount } from '../api';
import { QUERY_KEYS } from './querykey';

export const useCreateUserAccount=()=>{
    return useMutation({
        mutationFn:(user:INewUser)=>createUserAccount(user)
    })
};
export const useSignInAccount=()=>{
    return useMutation({
        mutationFn:(user:{email:string,password:string})=>signInAccount(user)
    })
};


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
};

export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };


