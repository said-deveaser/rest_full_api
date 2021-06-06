
type CreateErrorResponseBodyParams = {
    message: string
}
export const createErrorResponseBody = ({message}:CreateErrorResponseBodyParams) => {
    return {
        message
    }
}