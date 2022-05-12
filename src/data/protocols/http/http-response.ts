export enum HttpStatusCode {
    noContent = 204,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    internalServerError = 500,
}

export type HttpResponse = {
    statusCode: HttpStatusCode;
    body?: any;
}
