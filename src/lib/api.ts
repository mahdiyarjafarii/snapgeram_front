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
        console.log(response.data);
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

          console.log(response.data);
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