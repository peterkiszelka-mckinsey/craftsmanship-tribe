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
programmed in for the test.

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

Neerg Bank is a brand-new institution on the banking front and sets milestones to reach their customers as fast as
they can. They hire a consulting company to accelerate their development before spending money on a dedicated
engineering team.

#### MVP

The Bank would like to expose product offerings like loans and fancy looking debit/credit cards to its customers.
However, they have regional legal restrictions on the available countries where they can monetize their goods.

#### MMP

After the implementation of a legal monetization, they would like to give a better overview on their portfolio and
only expose products to customers that are part of an active product offering.

They deeply care about their customers (and business), and for the sake of portfolio simplicity, they are prioritizing
a unique-item policy: no customers shall acquire a product offering more than once.

### Tasks

This kata requires the developer to implement a product offering interface by exposing several functionalities:

- create a product offering
- get product offerings based on a location
- extend the list of countries where product offerings are available
- implement additional business needs

As a base implementation, adapters (repositories) are available to handle recommendations and countries using MongoDB.
On top of that, steps 1) and 2) have already been implemented.  

#### 1) Implement the required features with integration tests

In this step, the goal is implement the MVP user journey and write integration tests that validate the journey
end-to-end.

#### 2) Validate the implementation with unit tests using mocks

The implementation of the first unit tests requires mocking by using `ts-mockito`.

For example, in case the developer would like to mock `fizz()` method on `FizzBuzz` interface to return `buzz`,
this code fragment cracks the case:

```typescript
import { instance, mock, when } from 'ts-mockito';

const fizzBuzzMock = mock<FizzBuzz>();
const fizzBuzz = instance(fizzBuzzMock);
when(fizzBuzzService.fizz()).thenResolve('buzz');
```

#### 3) Extend product offerings with categories

No implementation is permanent unless it is dead, the product offering service requires a new behaviour:
exposing categories.

Until now, categories remain unknown to the system, therefore they may get introduced to all abstractions.

A category is a grouping logic for product offerings. They may be `exclusive`, `seasonal` or `common`.

The Neerg Bank feels this addition may have a positive effect on their portfolio overview.

#### 4) Instead of mocks, validate the implementation with unit tests using fake implementations

As a practice, let's refactor the written test suite.

However, in this case, let's ditch the mocks and use fake implementations of the repository interfaces. We could also
say that we are black box testing the domain service with no dependencies.

#### 5) Extend product offerings with start date

We've seen the complexity of adding a new feature to a test suite that uses mocks.

Let's introduce a not yet existing field to the system to a test suite with fake implementations.

Can we identify key differences between the two approaches?
- number of tests
- reacting to breaking changes
- simplicity
- void-like functionalities
- acting as a specification

#### 6) Expose product offerings that are available based on their start and expiration dates.

Users are not interested in irrelevant product offerings, they would like to acquire them now. The Neerg Bank loves its
customers.

Therefore, we only have to expose the product offerings that are currently available.

#### 7) Introduce a country deletion option

There is no need to add counties endlessly, we should maintain them. Restrictions come and go, it's better to prepare.

Based on the gained experience, it is time to introduce a fully new functionality, to delete countries.

#### 8) Introduce an inventory and allow the user to purchase a product offering.

Users don't just look around product offerings, they would finally like to acquire something.

As a result, our system requires a storage option to track the sealed deals.

#### 9) Expose product offerings that are not acquired by the user.

Unfortunately, our business has a restriction: its users can only acquire a product offering once.

Currently, we let the users acquire a product offering multiple times. However, it would suit the business better to
not offer them a reacquire option.
