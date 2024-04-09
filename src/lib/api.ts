import axios from 'axios';
import {INewUser} from './../../types';


export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await axios.post('http://localhost:3001/v1/auth/register', user);
        return newAccount.data;
      
    } catch (error) {
        console.log('Error creating user account:', error);
    }
};


export async function signInAccount(user:{email:string,password:string}) {
    try {
        const response = await axios.post('http://localhost:3001/v1/auth/login', user);
        const token:string=response.data.access_token
        if(response){
            localStorage.setItem("cookieFallback",token)
            return token;
        }
        
      
    } catch (error) {
        console.error('Error creating user account:', error);
    }
};

export async function getCurrentUser() {
    const localToken = localStorage.getItem("cookieFallback");
    
    try {
        const response = await axios.get('http://localhost:3001/v1/auth/auth-check', {
            headers: {
                'Authorization': `${localToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createPost(post:{
    caption: string,
    location:string,
    tags : string,
    image : any,
    creator_id:string
    }){

    const formData = new FormData();
    formData.append('caption', post.caption);
    formData.append('location', post.location);
    formData.append('tags', post.tags);
    formData.append('creator_id',post.creator_id);
    formData.append('image', post.image[0]);

      

    try{
        const response = await axios.post('http://localhost:3001/v1/post/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data;


    }catch(error){

        console.log(error);
        throw error;

    }
}

export async function updatePost(post:{
    caption: string,
    location:string,
    tags : string,
    image? : any,
    post_id:string
    imageUrl:string 
    }){

    const formData = new FormData();
    formData.append('caption', post.caption);
    formData.append('location', post.location);
    formData.append('tags', post.tags);
    formData.append('post_id',post.post_id);
    formData.append('image', post.image[0]);
    formData.append('imageUrl', post.imageUrl);


      

    try{
        const response = await axios.post('http://localhost:3001/v1/post/update', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data;


    }catch(error){

        console.log(error);
        throw error;

    }
}



export async function getRecentPosts() {
    try{
        const response= await axios.get('http://localhost:3001/v1/post',{
            params:{
                limit: 20
            }
        })
        return response.data;

    }catch(error){
        console.log(error);
        throw error
    }
    
}


export async function likePost(userId:string,postId:string){
    try{
        const likePost = await axios.post('http://localhost:3001/v1/post/like', {
            userId,
            postId
        });
        return likePost.data;
      

    }catch(error){
        console.log(error)
    }
};
export async function deleteLikePost(userId:string,postId:string){
    try{
        const likePost = await axios.post('http://localhost:3001/v1/post/like/delete', {
            userId,
            postId
        });
        return likePost.data;
      

    }catch(error){
        console.log(error)
    }
};

export async function savePost(userId:string,postId:string){
    try{
        const savePost = await axios.post('http://localhost:3001/v1/post/save', {
            userId,
            postId
        });
        return savePost.data;
      

    }catch(error){
        console.log(error)
    }
};
export async function deleteSavePost(userId:string,postId:string){
    try{
        const savePost = await axios.post('http://localhost:3001/v1/post/save/delete', {
            userId,
            postId
        });
        return savePost.data;
      

    }catch(error){
        console.log(error)
    }
};

export async function getPostById(postId?:string){
    try{
        const post=await axios.get(`http://localhost:3001/v1/post/${postId}`);
        return post.data

    }catch(error){
        console.log(error);
        throw error
    }
}
export async function deletePost(postId?:string){
    try{
        const deletedPost=await axios.delete(`http://localhost:3001/v1/post/${postId}`);
        return deletedPost.data;

    }catch(error){
        console.log(error)
    }
}

