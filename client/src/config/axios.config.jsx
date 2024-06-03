import axios from "axios"

const axiosInstance = axios.create(
    {
        // baseURL:import.meta.env.VITE_API_URL,
        timeout:30000,
        timeoutErrorMessage:"Server timed out...",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })

    axiosInstance.interceptors.response.use((response)=>{
       return response;
    },(error)=>{
        // TODO 500 response
            // status code 401
                //token expired
                    //axios refresh token access token
        // console.log("error", error);
      throw error.response;
    })

    export default axiosInstance;