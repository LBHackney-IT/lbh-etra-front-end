import { configure, shallow } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';
import React from 'react';
import RecordIssues from '.';


configure ({adapter:new Adapter()});

it('RecordIssues component loads', () => {
    shallow(<RecordIssues issues={[]}/>);
 });

 describe('When we go to render the Record issues', () => {
     const wrapper = shallow(<RecordIssues issues={[]}/>)

    it('Then the "Add Issue" button is displayed', () => {
        //button should be hidden
        var addIssueButton = wrapper.find('#add-issue');
        expect(addIssueButton.exists()).toBe(true); 
    });
 });

 describe('When we go to render the add issues button and simulate a click', () => {
    const wrapper = shallow(<RecordIssues issues={[]}/>);
    var addIssueButton = wrapper.find('[data-test="add-issue"]');
    addIssueButton.simulate('click');

    it('Then another issue can be added', () => {
       expect(wrapper.find('AddIssue')).toHaveLength(1);
    });

    it('Then we can add two more issues', () => {
        addIssueButton.simulate('click');
        addIssueButton.simulate('click');
        expect(wrapper.find('AddIssue')).toHaveLength(3);
     });
});