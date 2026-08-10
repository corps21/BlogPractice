export class ApiResponse {
	constructor(success, message, data = undefined) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
}
