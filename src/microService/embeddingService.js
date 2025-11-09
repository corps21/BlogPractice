import geminiEmbeddingApi from "@/api/geminiEmbeddingApi"
import { axiosWrapper } from "@/lib/utils"

const MODEL = "models/gemini-embedding-001"

export class EmbeddingService {

    constructor(model) {
        this.model = model 
    }

    getEmbeddings = axiosWrapper(async (text) => {
        return geminiEmbeddingApi.post("/", {
            model: this.model,
            content: {
                parts: [{text}]
            }
        })
    })
}

export const embeddingService = new EmbeddingService(MODEL) 