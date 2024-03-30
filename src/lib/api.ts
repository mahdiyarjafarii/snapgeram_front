import axios from 'axios';
import {INewUser} from './../../types';

export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await axios.post('your_api_endpoint_here', user);
        return newAccount;
      
    } catch (error) {
        console.error('Error creating user account:', error);
    }
};


export async function signInAccount(user:{email:string,password:string}) {
    try {
        const token = await axios.post('your_api_endpoint_here', user);
        return token;
      
    } catch (error) {
        console.error('Error creating user account:', error);
    }
};
