import {HttpPostClient} from "../usecases/authentication/protocols/http/http-post-client";

export class HttpClientPostClientSpy implements HttpPostClient {
    url?: string;

    async post(url: string): Promise<any> {
        this.url = url;
        return Promise.resolve();
    }
}
