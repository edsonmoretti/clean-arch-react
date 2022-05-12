import { AuthenticationParams } from "@/domain/usecases/authentication";

const faker = require("faker");

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
