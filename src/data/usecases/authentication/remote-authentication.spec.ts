import { HttpPostClient } from "./protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication", () => {
  test("should call HttpClient with correct URL", async () => {
    class HttpClientPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<any> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = "any_url";
    const httpClientPostClientSpy = new HttpClientPostClientSpy();
    const sut = new RemoteAuthentication(url, httpClientPostClientSpy);
    await sut.auth();
    expect(httpClientPostClientSpy.url).toBe(url);
  });
});
