import axios from "axios";
import conf from "@/conf/conf";

const geminiSummaryApi = axios.create({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    headers: {
        'Content-Type': "application/json",
        'x-goog-api-key': conf.geminiApiKey
    }
})

export default geminiSummaryApi