import { configure, shallow } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';
import React from 'react';
import RecordIssues from '.';


configure ({adapter:new Adapter()});
it('RecordIssues component loads', () => {
    shallow(<RecordIssues issues={[]}/>);
 });

 describe('when we go to render the Record issues', () => {
     const wrapper = shallow(<RecordIssues issues={[]}/>)

     it('Then the "Add Issue" button is displayed', () => {
        //button should be hidden
        var addIssueButton = wrapper.find('#add-issue');
        expect(addIssueButton.exists()).toBe(true); 
    });
 });