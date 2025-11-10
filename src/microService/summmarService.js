import geminiSummaryApi from "@/api/geminiSummaryApi"

const MODEL = "models/gemini-2.5-flash"
const SYSTEM_INSTRUCTION = {
    parts: [{
        text: "You will be given a blog in html, summarize the blog's content, and don't include any other meta information"
    }]
}

export class SummaryService {
    getSummary = async(content) => {
        return geminiSummaryApi.post("/" , {
            model: MODEL,
            system_instruction: SYSTEM_INSTRUCTION,
            contents: {
                parts: [{
                    text: content
                }]
            }
        })
    }
}

const summaryService = new SummaryService()

export default summaryService