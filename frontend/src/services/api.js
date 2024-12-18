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
  



export default API ; 
