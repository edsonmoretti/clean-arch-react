export enum HttpStatusCode {
    ok = 200,
    noContent = 204,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    internalServerError = 500,
    badRequest = 400,
}

export type HttpResponse = {
    statusCode: HttpStatusCode;
    body?: any;
}
