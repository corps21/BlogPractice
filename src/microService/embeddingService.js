import geminiEmbeddingApi from "@/api/geminiEmbeddingApi"

const MODEL = "models/gemini-embedding-001"

export class EmbeddingService {

    constructor(model) {
        this.model = model 
    }

    getEmbeddings = async (text) => {
        return geminiEmbeddingApi.post("/", {
            model: this.model,
            content: {
                parts: [{text}]
            }
        })
    }
}


export const embeddingService = new EmbeddingService(MODEL) 