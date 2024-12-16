import axios from 'axios';

const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers : {'Content-Type' : 'application/json'},
    
});

// for register a providerService
export const register = async (data) => {
    try {
        const response = await API.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
// for the login 
export  const loginUser = async (data)=>{
    try{
          const response = await API.post('/login', data);
          return response.data;
    }catch(error){
        console.error('Error login user:', error);
        throw error ; 
    }
  
}



export default API ; 
