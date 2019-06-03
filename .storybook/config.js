import { configure } from '@storybook/react';

function loadStories() {
  const requireStories = require.context('../src', true, /stories\.tsx$/);
  const children = requireStories.keys();

  children.forEach(requireStories);
}

configure(loadStories, module);
