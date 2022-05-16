import {HttpPostClientSpy} from "@/data/test/mock-http-client";
import {mockAccount, mockAccountModel} from "@/domain/test/mock-account";
import {RemoteAuthentication} from "./remote-authentication";
import {InvalidCredentialsError} from "@/domain/errors/invalid-credentials-error";
import {HttpStatusCode} from "@/data/protocols/http/http-response";
import {UnexpectedError} from "@/domain/errors/unexpected-error";
import {NotfoundError} from "@/domain/errors/notfound-error";
import {InternalServerError} from "@/domain/errors/internal-server-error";
import {AuthenticationParams} from "@/domain/usecases/authentication";
import {AccountModel} from "@/domain/models/account-model";

const faker = require("faker");

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

    test("should throw NotfoundError if HttpClient returns 404", async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const authenticationParams = mockAccount();
        const promise = sut.auth(authenticationParams);
        await expect(promise).rejects.toThrow(new NotfoundError());
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
