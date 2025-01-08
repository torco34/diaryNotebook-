// typescript de FormAuth
export interface IFormAuth {
  name: string;
  email: string;
  password: string;
  city?: string;
  success?: string;
  error?: string;
}

 export interface IFormSubmitOptions {
   setStatus: (status: { success?: string; error?: string }) => void;
   isLogin: boolean;
   login: (email: string, password: string) => Promise<void>;
   register: (
     name: string,
     email: string,
     password: string,
     city: string
   ) => Promise<void>;
   router: {
     push: (path: string) => void;
   };
 }