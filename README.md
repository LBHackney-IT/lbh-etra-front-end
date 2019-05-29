# ETRA Frontend

## Running the application

### Setup

1. Checkout git repository
2. Run `npm install` to install dependencies

### Run application in development mode ([http://localhost:3000](http://localhost:3000))
```
make serve
```

### [Run tests](https://facebook.github.io/create-react-app/docs/running-tests) in watch mode
```
make test
```

### [Run e2e browser tests](https://devexpress.github.io/testcafe/documentation/using-testcafe/)
This project uses testcafe for e2e browser tests. It also uses an extension of testcafe called [testcafe-react-selectors](https://github.com/DevExpress/testcafe-react-selectors) that allows you to select react components in your browser tests.

You can run these tests by running the application locally in development mode and then running:

```
make test-e2e
```
