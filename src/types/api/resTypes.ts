


import axios from "axios";


export interface resCustomType{

  success: boolean;
  data:any;
  message: string;
  status:boolean
  
}

export const getApiErrorMessage = (error: unknown): string => {
  
  console.log(error)

  if (axios.isAxiosError<resCustomType>(error)) {
    console.log(error.response?.data?.message)
    return error.response?.data?.message|| "Something went wrong."
  }

  if (error instanceof Error) {
    console.log(error.message)
  }

  return "Something went wrong.";
};




