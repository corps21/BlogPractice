import axios from "axios";
import conf from "@/conf/conf";

const geminiEmbeddingApi = axios.create({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": conf.geminiApiKey
    }
})

export default geminiEmbeddingApi