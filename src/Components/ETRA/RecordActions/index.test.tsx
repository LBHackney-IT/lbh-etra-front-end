import { configure, shallow } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';
import React from 'react';
import RecordIssues from '.';
import { IBlock } from '../../../Domain/Area';

configure ({adapter:new Adapter()});

const mockBlocks : IBlock[] = [
   { name: "Block 1" },
   { name: "Block 2" },
   { name: "Block 3" }
];

it('RecordIssues component loads', () => {
    shallow(<RecordIssues readOnly={false} blocks={mockBlocks} onChangeIssues={jest.fn()} issues={[]}/>);
 });

 describe('When we go to render the Record issues', () => {
     const wrapper = shallow(<RecordIssues readOnly={false} blocks={mockBlocks} onChangeIssues={jest.fn()} issues={[]}/>)

    it('Then the "Add Issue" button is displayed', () => {
        //button should be hidden
        var addIssueButton = wrapper.find('#add-issue');
        expect(addIssueButton.exists()).toBe(true); 
    });
 });

 describe('When we go to render the add issues button and simulate a click', () => {
    const wrapper = shallow(<RecordIssues readOnly={false} blocks={mockBlocks} onChangeIssues={jest.fn()} issues={[]}/>);
    var addIssueButton = wrapper.find('[data-test="add-issue"]');
    addIssueButton.simulate('click');

    it('Then the header is shown', () => {
      const header = wrapper.find('[data-test="issues-header"]')
      expect(header.exists()).toBe(true);

   });

    it('Then another issue can be added', () => {
       expect(wrapper.find('AddIssue')).toHaveLength(1);
    });

    it('Then we can add two more issues', () => {
        addIssueButton.simulate('click');
        addIssueButton.simulate('click');
        expect(wrapper.find('AddIssue')).toHaveLength(3);
     });
});
