export class ApiError extends Error {
    constructor(message, httpStatusCode) {
        super(message),
        this._httpStatusCode = httpStatusCode
    }

}