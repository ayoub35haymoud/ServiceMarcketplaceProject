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
export const postProfileData = async (data) => {
    const token = localStorage.getItem('token');
    const response = await API.post('/user/profile', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        }
    });
    return response.data;
};
// update the data ;
export const  putProfileData = async(data)=>{
    const token = localStorage.getItem('token'); 
    const response = await API.post('/user/profile',data ,{
        headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
    }); 
    console.log(response.data); 
    return response.data;
};
// fetch the profile data
export const  getProfileData = async()=>{
    const token = localStorage.getItem('token');
    const response = await API.get('/user/profile' , {
        headers: { Authorization: `Bearer ${token}`},
    });  
    return response.data;
};

// fetch profile data inside user data
export const fetchUserData = async()=>{
    const token = localStorage.getItem('token');
    const response = await API.get('/user',{
        headers : { Authorization: `Bearer ${token}`}
    });
    return response.data;
}

{/* the call request related to the services */}

// Create service
export const createUserService = async (serviceData) => { 
    const token = localStorage.getItem('token');
    const response = await API.post('/user/services', serviceData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

//  Fetch services
export const fetchUserService = async (id) => { 
    const token = localStorage.getItem('token');
    const response = await API.post(`/user/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

//  Delete service
export const deleteUserService = async (id) => { 
    const token = localStorage.getItem('token');
    const response = await API.delete(`/user/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// fetch service categories
export const fetchServiceCategories= async()=>{
        const response = await API.get('services/categories');
        return response.data;  
}

// fetchSub_Categories
export const fetchUserSub_Categories= async()=>{
    const response = await API.get('services/sub_categories');
    return response.data;  
}

{/* the call request related to the services */}
export default API;

