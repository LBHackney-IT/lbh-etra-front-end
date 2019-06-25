import React from 'react';
import ReactDOM from 'react-dom';
import RepName from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ReviewMeeting from '../ReviewMeeting';

configure({ adapter: new Adapter() });

it('RepName component loads', () => {
   shallow(<RepName onUpdated={(repName: string) => {console.log(`{Representative Name ${repName}}`)}}/>);
});

describe('When we go to render the meeting', () => {


   
});