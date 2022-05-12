import { HttpPostClient } from "./protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";
import {HttpClientPostClientSpy} from "../../test/mock-http-client";

describe("RemoteAuthentication", () => {
  test("should call HttpClient with correct URL", async () => {

    const url = "any_url";
    const httpClientPostClientSpy = new HttpClientPostClientSpy();
    const sut = new RemoteAuthentication(url, httpClientPostClientSpy);
    await sut.auth();
    expect(httpClientPostClientSpy.url).toBe(url);
  });
});
