import conf from "../conf/conf";
import {Client, Storage, ID} from "appwrite";

export class StorageService {
    client;
    storage;

    constructor() {
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    }

    async uploadImage(file) {
        
        try {
            return await this.storage.createFile(
                conf.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("StorageService :: uploadImage :: error ", error)
        }

        return false;
    }

}