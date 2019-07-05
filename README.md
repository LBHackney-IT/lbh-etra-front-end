# ETRA Frontend

## Running the application

### Setup

1. Checkout git repository
2. Run `npm install` to install dependencies

### Run application in development mode ([http://localhost:3000](http://localhost:3000))
```
make serve
```

### Routes, query strings and url fragments

#### Token Loader
The default route is a token loader that intercepts JWT tokens included as url fragments and saves them, before forwarding you on to your original destination. These query strings will be picked up no matter which route you attempt to go to, for example:

`http://localhost:3000#officerToken={officerToken}&traToken={traToken}`

#### Landing Page ([http://localhost:3000/](http://localhost:3000/))
The landing page allows you to start a new meeting or select saved drafts for editing, and is what will be displayed when you go to the base url of the application. You can also add the query string `traId` to the base url to bypass the landing screen and immediately begin a new meeting, for example:

`http://localhost:3000?traId=47`

#### Meeting Page ([http://localhost:3000/meeting/](http://localhost:3000/meeting/))
The meeting page allows you to create, modify, sign off and view completed meetings. It can be found at `/meeting/`. This is where you will be forwarded to from the landing page if you create a new meeting or choose to modify a saved draft meeting. You can also add the query string `existingMeeting` to load an existing meeting for signOff for viewing, depending on its current status. For example:

`http://localhost:3000/meeting?existingMeeting=true`

## Other Commands

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
