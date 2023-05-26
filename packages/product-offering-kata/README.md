# Product Offering Kata

A kata to improve testing skills.

## Getting started

To run the tests locally, we must install the required dependencies:

```shell
npm ci
```

Available test configs are available in `package.json`.

A whole test suite can validate the implementation:

```shell
npm run test
```

### Testing keywords

**Dummy** objects are passed around but never actually used. Usually they are just used to fill parameter lists.

**Fake** objects actually have working implementations, but usually take some shortcut which makes them not suitable for
production (an in memory database is a good example).

**Stubs** provide canned answers to calls made during the test, usually not responding at all to anything outside what's
programmed in for the test. They are similar to fakes, but don't contain working implementation.

**Spies** are stubs that also record some information based on how they were called. One form of this might be an email
service that records how many messages it was sent.

**Mocks** are what we are talking about here: objects pre-programmed with expectations which form a specification of the
calls they are expected to receive.

*-Martin Fowler*

### Two approaches to TDD

The **classical TDD** (Detroit) style is to use real objects if possible and a double if it's awkward to use the real
thing. So a classical TDDer would use a real warehouse and a double for the mail service. The kind of double doesn't
really matter that much. *(state testing)*

A **mockist TDD** (London) practitioner, however, will always use a mock for any object with interesting behavior. In
this case for both the warehouse and the mail service. *(code behavior testing)*

### Format tests

Checks if the formatting matches the requirements.

```shell
npm run test:lint
```

### Unit tests

Checks if a unit is behaving as expected.

Unit tests are fast and usually executed in-memory. They are not brittle. They can test high level business
functionality, just like low level details. They are as independent as possible.

Good unit tests are not just tests. They are specifications.

```shell
npm run test:unit
```

### Mutation tests

Checks if a breaking implementation change results in a failing test.

```shell
npm run test:mutation
```

### Integration tests

Checks if the application is working as expected end-to-end, without mocked out inner dependencies, but with mocked
outer dependencies.

```shell
npm run test:integration
```

## Kata

### Business case


Neerg Bank, a newly established banking institution, aims to rapidly engage with its customers and achieve significant 
milestones. To expedite their development process and avoid upfront investment in a dedicated engineering team, 
they have decided to engage a consulting company. The consulting company will assist Neerg Bank in accelerating their 
progress.

#### MVP

The Bank's minimum viable product (MVP) involves providing customers with access to various product offerings, such as 
loans and visually appealing debit/credit cards. However, the Bank faces legal restrictions in certain regions, 
limiting the countries where they can generate revenue from their goods.

#### MMP

Once the legal monetization is implemented, the Bank aims to provide customers with an improved portfolio overview. 
They intend to selectively expose products only to customers who are eligible for active product offerings. 
With a strong focus on customer satisfaction and business efficiency, the Bank has adopted a unique-item policy. 

This policy ensures that no customer can acquire a particular product offering more than once, streamlining the 
portfolio and avoiding duplicate purchases.

### Tasks

This kata requires the developer to implement a product offering interface by exposing several functionalities:

- create a product offering
- get product offerings based on a location
- extend the list of countries where product offerings are available
- implement additional business needs

As a base implementation, adapters (repositories) are available to handle recommendations and countries using MongoDB.
On top of that, steps 1) and 2) have already been implemented.  

#### ~~1) Implement the required features with integration tests~~

In this step, the goal is to implement the user journey for the MVP and create integration tests to validate the entire 
journey from start to finish.

The user journey implementation involves designing and developing the necessary software components and features to 
enable customers to interact with the Bank's product offerings.
This includes functionalities such as browsing available products. The implementation should adhere to the specific 
requirements and constraints outlined in the MVP definition.

Integration tests are essential to ensure the smooth functioning of the user journey. 
These tests will simulate real-world scenarios by executing the entire user journey, from the initial interaction 
with the product offerings to the final purchase confirmation. The tests will verify the integration and compatibility 
of various system components, as well as validate the correct behavior and functionality of the software.

By performing end-to-end integration testing, any issues or bugs that may arise during the user journey can be 
identified and addressed early in the development process, ensuring a reliable and seamless experience for the Bank's 
customers.

#### ~~2) Validate the implementation with unit tests using mocks~~

To facilitate mocking in unit tests using `ts-mockito`, you can follow the example code fragment provided:

```typescript
import { instance, mock, when } from 'ts-mockito';

// Create a mock instance of the FizzBuzz interface
const fizzBuzzMock = mock<FizzBuzz>();

// Get the actual instance of the mocked object
const fizzBuzz = instance(fizzBuzzMock);

// Define the behavior of the mocked method
when(fizzBuzz.fizz()).thenResolve('buzz');
```

In the above code, the `FizzBuzz` interface is mocked using `ts-mockito`. The `mock<FizzBuzz>()` function creates a
mock instance of the interface, and `instance(fizzBuzzMock)` retrieves the actual instance of the mocked object.

To define the behavior of a specific method on the mock, `when(fizzBuzz.fizz()).thenResolve('buzz')` is used. 
This sets the expectation that when the `fizz()` method is called on the mocked `FizzBuzz` object, 
it will resolve with the value `'buzz'`.

By utilizing these mocking capabilities, you can effectively simulate and control the behavior of dependencies or 
external services during unit testing, allowing you to isolate the code under test and focus on specific scenarios 
or conditions.

#### ~~3) Extend product offerings with categories~~

In order to enhance the portfolio overview, the product offering service requires a new behavior that involves exposing 
categories. Up until now, the system has been unaware of any categories, so they need to be introduced across all 
abstractions. A category serves as a grouping mechanism for product offerings.

By incorporating categories into the system, Neerg Bank believes that it will have a positive impact on the portfolio
overview. Customers will have a clearer understanding of how the product offerings are organized and can easily navigate 
through different categories to find relevant products. This addition will provide a more structured and intuitive user 
experience, ultimately improving customer satisfaction and engagement with the Bank's portfolio.

#### 4) ~~Instead of mocks, validate the implementation with unit tests using fake implementations~~

As a practice, let's refactor the existing test suite by replacing the mocks with fake implementations of the repository 
interfaces. By doing so, we will conduct black box testing on the domain service without relying on any external
dependencies.

#### 5) ~~Extend product offerings with subtitle~~

We have observed the challenges that arise when adding a new feature to a test suite that utilizes mocks.

Now, let's consider the scenario where we need to introduce a new field to the system and incorporate it into a test 
suite that employs fake implementations.

#### 6) ~~Use fixtures over definitions in tests~~

Fixtures are a valuable tool in making tests more readable and enabling a focus on behavior. 
They also help decouple tests from underlying models by providing predefined data structures.

Here's an example of introducing a fixture to create a country in TypeScript:

```typescript
export const createCountry = ({ name = '[name]' }: { name?: string }): CountryCreate => {
  return { name };
};
```

In the above code snippet, we define a `createCountry` fixture function that takes an optional `name` parameter. 
It returns a `CountryCreate` object, which can be used to create a country with the specified name. 
The default value for `name` is set to `'[name]'`, representing a placeholder value that can be replaced as needed.

By utilizing this fixture, tests can easily create country objects with different names without having to manually 
create JSON objects each time. This promotes readability, reduces repetition, and allows for more focused testing on 
the desired behavior.

#### 7) ~~Extend product offerings with price~~

We've seen the complexity of adding a new feature to a test suite that uses plenty of json objects.

Let's introduce a not yet existing field to the system to a test suite with fixtures.

Can we identify key differences between mocks without fixtures and fakes with fixtures?
- number of tests
- reacting to breaking changes
- simplicity
- void-like functionalities
- acting as a specification

#### 8) Expose product offerings that are available based on their start and expiration dates.

To cater to the interests of users and prioritize their needs, Neerg Bank aims to only expose product offerings that 
are currently available. Users are not interested in irrelevant product offerings, and the Bank values its customers' 
satisfaction.

By ensuring that only available product offerings are exposed, the Bank can streamline the user experience and present 
users with relevant options that they can acquire immediately. This approach helps to eliminate confusion and optimize 
the presentation of products, enhancing customer engagement and overall satisfaction.

#### 9) Introduce a country deletion option


Considering the need for maintaining countries and the dynamic nature of restrictions, it is crucial to prepare for 
changes rather than continuously adding new countries.

Building on the gained experience, it is an opportune time to introduce a new functionality for deleting countries. 
This feature will enable the system to remove countries from the list when necessary. By implementing this 
functionality, the system can adapt to changing restrictions and ensure that the list of countries remains up to date.

The ability to delete countries provides flexibility and improves the overall management of country data. It allows for 
efficient maintenance of the country list and ensures that users are presented with accurate and relevant information.

#### 10) Allow users to purchase a product offering

In addition to the storage option for tracking sealed deals, it is essential to implement the functionality to seal 
a deal.

Sealing a deal involves the finalization of a transaction or purchase. By incorporating this functionality into the 
system, users can successfully complete their acquisitions and have a clear confirmation that the deal has been 
officially closed.

The process of sealing a deal typically involves verifying payment details, generating purchase receipts, updating 
inventory, and recording the transaction in the system's database. This functionality ensures that all necessary steps 
are taken to securely and accurately process the transaction, providing users with a seamless and reliable purchasing 
experience.

By enabling the functionality to seal a deal, the system can effectively support users in finalizing their purchases, 
maintaining accurate records, and facilitating smooth and successful transactions.

#### 11) Introduce a product inventory for users

Acknowledging that users ultimately want to acquire products, it becomes essential to introduce a storage option
in the system to track sealed deals.

By implementing a storage solution for sealed deals, the system can effectively keep a record of successful transactions 
and completed acquisitions. This feature allows users to finalize their purchases and ensures that relevant information, 
such as product details, transaction history, and customer data, is securely stored.

Tracking sealed deals not only provides users with a sense of confidence and transparency but also enables the 
business to maintain accurate records and insights into customer preferences and purchasing patterns. 
This data can further be utilized for analytics, reporting, and improving the overall user experience.

Introducing a storage option for sealed deals enhances the system's functionality and brings it closer to 
fulfilling users' end goal of acquiring products effectively and securely.

#### 12) Expose product offerings that are not acquired by the user.

In response to the business restriction that users can only acquire a product offering once, it would be more aligned 
with the business's needs to eliminate the option for users to reacquire a product offering.

Currently, the system allows users to acquire a product offering multiple times, but to comply with the restriction, 
it is necessary to remove the reacquire option. This ensures that users are not presented with the opportunity to 
acquire the same product offering more than once.

By implementing this change, the system enforces the business rule and prevents any potential confusion or discrepancies 
that may arise from users mistakenly or intentionally reacquiring a product offering. This restriction helps maintain 
the integrity of the user experience and ensures that users are encouraged to explore and acquire other relevant product 
offerings instead of duplicating their purchases.
