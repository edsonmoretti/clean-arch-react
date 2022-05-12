import {HttpPostClient} from "@/data/protocols/http/http-post-client";
import {AuthenticationParams} from "@/domain/usecases/authentication";
import {HttpStatusCode} from "@/data/protocols/http/http-response";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) {
    }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpPostParams = {
            url: this.url,
            body: params,
        };

        const httpResponse = await this.httpPostClient.post(httpPostParams);
        switch (httpResponse.statusCode) {
            case HttpStatusCode.unauthorized: {
                throw new InvalidCredentialsError();
            }
            default: {
                return Promise.resolve();
            }
        }
    }
}
