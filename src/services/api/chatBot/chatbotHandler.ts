
import axiosClient from "../../axiosClient"
import { getApiErrorMessage,type resCustomType } from "../../../types/api/resTypes";



export const getAllDataApi=async()=>{

    try{

       const resAllDataApi:resCustomType = await axiosClient.get('/all')
       console.log("first")
       console.log(resAllDataApi)

         return {
      success: resAllDataApi.success,
      data:resAllDataApi.data,
      message: resAllDataApi.message
   
    };


    }catch(error){
console.log("error")
         const data = getApiErrorMessage(error)

    return { success: false, message: data };

    }
}




export const fetchMatchingRecords=async(value:string)=>{


    try{

       const resAllDataApi:resCustomType = await axiosClient.get(`/search/${value}`)
       console.log("first")
       console.log(resAllDataApi)

         return {
      success: resAllDataApi.success,
      data:resAllDataApi.data,
      message: resAllDataApi.message
   
    };


    }catch(error){
console.log("error")
         const data = getApiErrorMessage(error)

    return { success: false, message: data };

    }


}