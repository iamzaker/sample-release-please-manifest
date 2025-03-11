# feature-flags (iam/feature-flags)

![](./API/coverage.svg)

## Overview

The `feature-flags` package is a comprehensive library of utility functions and classes designed to streamline and simplify your JavaScript and TypeScript development. This package provides a wide range of functionalities, from data manipulation and validation to advanced error handling and logging.

With `feature-flags`, you can reduce boilerplate, improve code readability, and ensure consistency across your codebase. The package is designed with a focus on performance, robustness, and ease of use.

Whether you're working on a small project or a large-scale application, `feature-flags` can help you write cleaner, more efficient, and more maintainable code. It's a must-have tool for any JavaScript or TypeScript developer.

[Exception](#exception)
[Option](#option)
[Result](#result)

## Exception

The `Exception` class is a powerful tool for handling errors in a consistent and informative way. Here's how you can use it:

```typescript
import { Exception } from 'iam/feature-flags';

class CustomException extends Exception {}

try {
  // Some operation that can throw an error
  throw new CustomException('Something went wrong');
} catch (error) {
  if (error instanceof Exception) {
    console.error(error); // 'Something went wrong'
  } else {
    // Handle other types of errors
  }
}

// Returns an object literal representation of the exception.
const errObject = error.toObject();

// Returns a string representation of the exception object.
const errString = error.toString();

/* The object model of the base Exception class.
error: {
      "label": "UserAlreadyExistsException",
      "code": 422,
      "message": "User already exists.",
      "details": "User with email: john.smith@email.com already exists.",
      "stack":
          UserAlreadyExistsException: User already exists.
              at Object.value (/Workspace/projects/repo-caf-incubator/starters/nestjs-http-fastify/src/users/users.service.ts:46:41)
              at Value.match (/Workspace/projects/repo-caf-incubator/packages/feature-flags/src/option.ts:173:14)
              at UsersService.create (/Workspace/projects/repo-caf-incubator/starters/nestjs-http-fastify/src/users/users.service.ts:45:41)
              at UsersController.createUser (/Workspace/projects/repo-caf-incubator/starters/nestjs-http-fastify/src/users/users.controller.ts:55:44)
              at /Workspace/projects/repo-caf-incubator/node_modules/@nestjs/core/router/router-execution-context.js:38:29
              at processTicksAndRejections (node:internal/process/task_queues:95:5)
    }
*/
```

## Option

The `Option` type represents the possibly a value can contain some value or nothing (null/undefined). In declaration `Option<T>` generic type, it either be
a subclass of `Value<T>` which will have a value or `None` which is null/undefined. The APIs are the for both `Value<T>` and `None` which allows chained
operations with each method's behaviour adapted to respective subclass type.

```typescript
import { Option, Value, None } from 'iam/feature-flags';

const value = Value('Hello World!'); // Value is a subclass of Option<T> abstract class representing a value.

const none = None(); // None is subclass of Option<T> abstract class representing null/undefined.

// Value<T> and None can be created using the of() static factory method.
const value = Option.of('Hello, world!');
value.hasValue(); // true

const none = Option.of(undefined);
none.hasValue(): // false

// Retrieve a value from an Option object.

const value = Option.of('Hello, world!');
const message = valueOrNone.getValue(); // message = 'Hello World!'

const none = Option.of(undefined)
const message = valueOrNone.getValue(); // throw Error.

// Retrieve a value or a default value from an Option object.

const value = Option.of('Hello, world!');
const message = value.getValueOrDefault('No message found!'); // message = 'Hello World!'

const none = Option.of(undefined);
const message = none.getValueOrDefault('No message found!'); // message = 'No message found!'

// Perform a map (v) => v operation

const value = Option.of('Hello, world!');
const message = value
                  .map((v) => v.toUpperCase())
                  .getValue();  // message = 'HELLO WORLD!'

// Perform a bind (v) => Option<T> operation

const value = Option.of('Hello, world!');
const message = value
                  .bind((v) => Option.of(v.toUpperCase()))
                  .getValue(); // message = 'HELLO WORLD!'

// Perform a filter operation

const value = Option.of('Hello, world!');
const message = value
                  .filter((v) => v !== 'Hello World!')
                  .hasValue(); // false

// Use `match` to handle both the Some and None cases

const value = Option.of('Hello, world!');
const message = value.match({
  value: (v) => 'Greeting: ' + v,
  none: () => 'No message found!'
}); // message = 'Greeting: Hello world!'


// Chained operations, map and filter operations will be skipped if customer does not exists in the repository

const customerOrNone = Option.of(await customerRepository.findById('cust-007'))
                        .map((customer) =>
                        {
                          customer.fullName = customer.firstName + customer.lastName;
                          return customer;
                        })
                        .filter((customer) => customer.age > 25)
                        .match({
                          value: customer,
                          none: throw new Error('Customer does not exists!')
                        });

```

## Result

```Typescript
import { Result, Success, Failure } from 'iam/feature-flags'

function divide(x: number, y: number): Result<Error, number> {
  return y === 0 ? Result.failure(new Error('Division by zero error!')) : Result.success(x/y);
}

const goodResult = divide(100, 10);
const badResult = divide(100, 0)

// Get value for Result<TL, TR>

const value = goodResult.getValue() // value = 10

const value = badResult.getValue() // Throw error!

// Perform map operation of Result<TL, TR>

const value = goodResult.map((v) => v * 20)
                        .getValue() // value = 200

// Perform bind operation of Result<TL, TR>

const value = badResult.bind((v) => Result.success(v * 20))
                        .getValue() // value = 200



//




```
