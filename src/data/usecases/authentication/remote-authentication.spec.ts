import {HttpPostClientSpy} from "@/data/test";
import {mockAccount, mockAccountModel} from "@/domain/test";
import {RemoteAuthentication} from "./remote-authentication";
import {
    InvalidCredentialsError,
    NotFoundError,
    UnexpectedError,
    InternalServerError
} from "@/domain/errors";
import {HttpStatusCode} from "@/data/protocols/http";
import {AuthenticationParams} from "@/domain/usecases";
import {AccountModel} from "@/domain/models";
import faker from "faker";

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    };
};

describe("RemoteAuthentication", () => {
    test("should call HttpClient with correct URL", async () => {
        const url = faker.internet.url();
        const {sut, httpPostClientSpy} = makeSut(url);
        await sut.auth(mockAccount());
        expect(httpPostClientSpy.url).toBe(url);
    });

    test("should call HttpClient with correct Body", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        const authenticationParams = mockAccount();
        await sut.auth(authenticationParams);
        expect(httpPostClientSpy.body).toEqual(authenticationParams);
    });

    test("should throw InvalidCredentials erro if HttpClient returns 401", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        }
        const authenticationParams = mockAccount();
        const promise = sut.auth(authenticationParams);
        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    test("should throw UnexpectedError if HttpClient returns 400", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const authenticationParams = mockAccount();
        const promise = sut.auth(authenticationParams);
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test("should throw InternalError if HttpClient returns 500", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.internalServerError
        }
        const authenticationParams = mockAccount();
        const promise = sut.auth(authenticationParams);
        await expect(promise).rejects.toThrow(new InternalServerError());
    });

    test("should throw NotFoundError if HttpClient returns 404", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const authenticationParams = mockAccount();
        const promise = sut.auth(authenticationParams);
        await expect(promise).rejects.toThrow(new NotFoundError());
    });

    test('Shoul return an AccountModel if HttpClient returns 200', async () => {
        const {sut, httpPostClientSpy} = makeSut();
        const httpResult = mockAccountModel();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.auth(mockAccount());
        expect(account).toEqual(httpResult);
    });

});
