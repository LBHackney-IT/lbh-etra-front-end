import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import { ServiceProvider } from './ServiceContext';

configure({ adapter: new Adapter() });

describe('When using enzyme', () => {
  it('renders without crashing', () => {
      shallow(<App />);
   });
});