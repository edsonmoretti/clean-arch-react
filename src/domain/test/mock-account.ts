import { AuthenticationParams } from "@/domain/usecases/authentication";
import {AccountModel} from "@/domain/models/account-model";

const faker = require("faker");

export const mockAccount = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
});
