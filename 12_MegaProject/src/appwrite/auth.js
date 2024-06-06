import conf from '../conf/conf'
import {Client,Account,ID} from 'appwrite'

export class AuthService{

    client=new Client();
    account;
    constructor(){
      this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
     this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
         const userAccount = await this.account.create(ID.unique(),email,password,name);
         if (userAccount) {
           //call another method
                return this.logIn({email,password})
         }else{
            return userAccount;
         }
        } catch (error) {
            throw error;
        }
    }

    async logIn({email,password}){
        try {
            await  this.account.createEmailSession()
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
  try {
    return await this.account.get();
  } catch (error) {
    console.log("appwrite service::getCurrentUser::error",error)
  }
  return null;
    }

    async logout(){
        try {
           await this.account.deleteSession(); 
        } catch (error) {
            console.log("appwrite logout::error",error) 
        }
    }
}



const authService=new AuthService();

export default  authService();