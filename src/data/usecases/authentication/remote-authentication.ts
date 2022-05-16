import {HttpPostClient, HttpStatusCode} from "@/data/protocols/http";
import {AuthenticationParams} from "@/domain/usecases";
import {
    InvalidCredentialsError,
    InternalServerError,
    NotFoundError,
    UnexpectedError
} from "@/domain/errors";
import {AccountModel} from "@/domain/models";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {
    }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpPostParams = {
            url: this.url,
            body: params,
        };

        const httpResponse = await this.httpPostClient.post(httpPostParams);
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body;
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            case HttpStatusCode.internalServerError:
                throw new InternalServerError();
            case HttpStatusCode.notFound:
                throw new NotFoundError();
            default:
                throw new UnexpectedError();
        }
    }
}
