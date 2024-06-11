import { Client, Databases, Query} from "appwrite";
import conf from "../conf/conf";

export class DatabaseService {
    client;
    databases;

    constructor() {
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async getAllPosts(query = [Query.equal("status", ["Active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [...query]
            )
        } catch (error) {
            console.log("DatabaseService :: getAllPosts :: error ", error)
        }   

        return false;
    }

    async createPost({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            )
        } catch (error) {
            console.log("DatabaseService :: createPost :: error ", error)
        }   

        return false;
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("DatabaseService :: getPost :: error ", error)
        }

        return false;
    }

    async updatePost({title,content,featuredImage,status},slug) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        } catch (error) {
            console.log("DatabaseService :: updatePost :: error ", error)
        }
        return false;
    }

    async removePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("DatabaseService :: removePost :: error ", error)
        }

        return false;
    }
}

const databaseService = new DatabaseService()

export default databaseService;