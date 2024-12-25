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

// fetch provider dashboard 
export const getProviderDashboard = async () => {
    try{
        const token = localStorage.getItem('token');
        const response = await API.get('/provider-dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }catch(error){
        throw new error; 
    } 
  };
  // fetch customer dashboard 
  export const getCustomerDashboard = async () => {
    try{
        const token = localStorage.getItem('token');
        const response = await API.get('/customer-dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }catch(error){
        throw new error;
    }
  };
   

//   post the profile data 
export const  postProfileData = async(data)=>{
    const response = await API.post('/user/profile',data);  
    return response.data;
};
// update the data ;
export const  putProfileData = async(data)=>{
    const response = await API.put('/user/profile',data);  
    return response.data;
};
// fetch the profile data
export const  getProfileData = async()=>{
    const response = await API.get('/user/profile');  
    return response.data;
};
export default API; 



