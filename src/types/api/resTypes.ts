


import axios from "axios";


export interface resCustomType{

  success: boolean;
  data:any;
  message: string;
  
}

export const getApiErrorMessage = (error: unknown): string => {
  
  if (axios.isAxiosError<resCustomType>(error)) {
    console.log(error.response?.data?.message)
    return  "Something went wrong."
  }

  if (error instanceof Error) {
    console.log(error.message)
  }

  return "Something went wrong.";
};




