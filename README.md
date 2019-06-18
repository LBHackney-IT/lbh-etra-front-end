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

You can run these tests by running this command:

```
make test-e2e
```

### [Storybook](https://storybook.js.org/)
Storybook can be used to view components in isolation. To run storybook, use:
```
make storybook
```

To [add stories](https://storybook.js.org/docs/basics/writing-stories/) for a new component, add a new file alongside your component's `index.tsx` called `index.stories.tsx`. In that file you can define as many stories as you need for that component. It will look something like this:

```
import React from 'react';
import { storiesOf } from '@storybook/react';
import MyComponent from './index';

storiesOf('MyComponent', module)
  .add("opens correctly", () => (
    <MyComponent value1="" value2="" />
  ));
```
