export const errorMiddleware = (error, req, res, next) => {
    const httpStatus = error._httpStatusCode ?? 500;
    const message = error._httpStatusCode ? error.message : "Internal Server Error"
    return res.status(httpStatus).send(message)
}