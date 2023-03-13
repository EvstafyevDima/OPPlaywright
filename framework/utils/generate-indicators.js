import { faker } from '@faker-js/faker';

export function generateIndicators() {
  return {
    indicatorFullName: "Auto_" + faker.name.firstName() + faker.random.numeric(5),
    indicatorName: "Auto" + faker.name.firstName() + faker.random.numeric(5)
  }
}