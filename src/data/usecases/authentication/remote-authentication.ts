import {HttpPostClient} from "@/data/protocols/http/http-post-client";
import {AuthenticationParams} from "@/domain/usecases/authentication";
import {HttpStatusCode} from "@/data/protocols/http/http-response";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";
import {UnexpectedError} from "@/domain/errors/unexpected-error";
import {NotfoundError} from "@/domain/errors/notfound-error";
import {InternalServerError} from "@/domain/errors/internal-server-error";
import {AccountModel} from "@/domain/models/account-model";

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
                throw new NotfoundError();
            default:
                throw new UnexpectedError();
        }
    }
}
