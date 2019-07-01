import React from 'react';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Header from '.';

configure({ adapter: new Adapter() });

it('Header component loads', () => {
   shallow(<Header />);
});