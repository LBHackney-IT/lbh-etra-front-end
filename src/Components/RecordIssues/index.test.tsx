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

 describe('When we go to render the click the add issues button', () => {
    const wrapper = shallow(<RecordIssues issues={[]}/>);
    var addIssueButton = wrapper.find('[data-test="add-issue"]');
    addIssueButton.simulate('click');

    it('Then another issue can be added', () => {
       expect(wrapper.find('AddIssue')).toHaveLength(1);
    });

    it('Then we can delete the issue we added', () => {
        let addIssue = wrapper.find('AddIssue');
        expect(addIssue).toHaveLength(1);

        let deleteButton = addIssue.find('#delete-issue');
        expect(deleteButton).toHaveLength(1);

        deleteButton.simulate('click');
        expect(wrapper.find('AddIssue')).toHaveLength(0);
    });
});
