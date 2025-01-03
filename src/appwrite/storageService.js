import conf from "../conf/conf";
import {Client, Storage, ID} from "appwrite";

export class StorageService {
    client;
    storage;

    constructor() {
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    }

    async deleteImage(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteStorageId,
                fileId
            )
        } catch (error) {
            console.log("StorageService :: uploadImage :: error ", error)
        }
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

    getImagePreview(fileId) {
        try {
            return this.storage.getFilePreview(conf.appwriteStorageId,fileId);
        } catch (error) {
            console.log("StorageService :: getImagePreview :: error ", error);
        }
        return false;
    }

}

const storageService = new StorageService();

export default storageService;