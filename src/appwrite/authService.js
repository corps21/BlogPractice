import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import userDatabaseService from "./userDatabaseService";
export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, firstName, lastName }) {
    try {
      const userId = ID.unique();
      const name = `${firstName} ${lastName}`;

      await this.account.create(userId, email, password, name);
      await userDatabaseService.createUserInfo(userId, name);

      return true;
    } catch (error) {
      console.log("AuthService :: createAccount :: error ", error);
    }
    return false;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("AuthService :: logout :: error ", error);
    }

    return false;
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("AuthService :: login :: error ", error);
    }

    return false;
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AuthService :: getCurrentUser :: error ", error);
    }

    return false;
  }
}
const authService = new AuthService();

export default authService;
