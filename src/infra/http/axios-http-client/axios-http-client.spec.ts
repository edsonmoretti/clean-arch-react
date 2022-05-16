import {AxiosHttpClient} from "@/infra/http/axios-http-client/axios-http-client";
import axios from "axios";
import faker from "faker";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
    test('Should call axios with correct URL', async () => {
       const url = faker.internet.url();
       const sut = new AxiosHttpClient();
       sut.post({url: url});
       expect(mockedAxios).toHaveBeenCalledWith(url);
    });
});