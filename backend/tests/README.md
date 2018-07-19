# Backend Tests

This directory contains additional test suites beyond the unit tests already in [../backend](../backend). Whereas the unit tests run very quickly (since they don't make any network calls) , the tests in this directory are only run manually.

A separate `/tests` folder holds all the additional test setup and utilities not used by the application itself.

The test packages are:

## setup.js

Additional test setup. Runs before any tests.

```json
{
  ...
  "scripts": {
    ...
    "test": "mocha --require tests/setup --require ts-node/register src/**/*.spec.ts"
  }
}
```

Notice that `--require tests/setup` points to `setup.js` under _/tests_ folder.

> **Note!**  This file gets imported by mocha before running the unit tests. If you move or rename it, then update `package.json` accordingly

## mocks

This directory contains mocks and test fixtures.

## functional-tests

This will exercise end-to-end tests. Put your functional tests here...

> TODO: Decide on test runner; BDDStack? Nightwatch.js?

