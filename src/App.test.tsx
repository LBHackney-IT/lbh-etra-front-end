import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';


configure({ adapter: new Adapter() });

describe('When using enzyme', () => {
  it('renders without crashing', () => {
      shallow(<App />);
   });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});