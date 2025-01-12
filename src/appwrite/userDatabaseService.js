import { Client, Databases } from "appwrite";
import conf from "@/conf/conf";

export class UserDatabaseService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createUserInfo(userId, name) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        userId,
        {
          name,
        }
      );
    } catch (error) {
      console.log("UserDatabaseService :: createUserInfo :: error ", error);
    }
  }

  async getUserInfo(userId) {
    try {
        return await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUserCollectionId,
          userId
        );
    } catch (error) {
        console.log("UserDatabaseService :: getUserInfo :: error ", error);
    }
  }
}

const userDatabaseService = new UserDatabaseService();

export default userDatabaseService;
