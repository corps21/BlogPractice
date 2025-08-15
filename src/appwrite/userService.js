import { fetchWrapper } from "@/lib/utils"
import { baseUrl } from "./constant"
const postOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
}
export class UserService {
    constructor(baseUrl) {
        this.url = `${baseUrl}/user`
    }

    registerUser = fetchWrapper(async ({ fullName, email, userName, password }) => {
        const options = {
            ...postOptions,
            body: JSON.stringify({ fullName, email, userName, password })
        }
        const result = await fetch(`${this.url}/register`, options);
        return await result.json();
    })

    loginUser = fetchWrapper(async ({ email, userName, password }) => {
        console.log("Called it")
        const options = {
            ...postOptions,
            credentials: "include",
            body: JSON.stringify({email,password,userName})
        }
        const result = await fetch(`${this.url}/login`, options)
        return await result.json();
    })
}

export const userService = new UserService(baseUrl)