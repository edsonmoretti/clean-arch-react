import {
  HttpPostClient,
  HttpPostParams,
} from "data/usecases/authentication/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(params: HttpPostParams): Promise<any> {
    this.url = params.url;
    return Promise.resolve();
  }
}
