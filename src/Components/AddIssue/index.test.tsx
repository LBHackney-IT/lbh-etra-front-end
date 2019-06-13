import React from 'react'
import AddIssue from '.'
import {default as Adapter} from 'enzyme-adapter-react-16'
import { conditionalExpression } from '@babel/types';
import { configure, shallow } from 'enzyme';
import {IssueFactory} from '../../Factories/Issue/'

configure({adapter:new Adapter()});

describe('when we go to render the Add Issue Component',()=>{
    let issueFactory = new IssueFactory();
    let issue = issueFactory.create();

    it('Add Issue component loads',() => {
        shallow(<AddIssue index={0} onDeleteIssue={jest.fn()} onChangeIssue={jest.fn()} issue={issue}/>)
    })

    it('Then we can delete the issue we added', () => {
        const onDeleteIssueCallback = jest.fn();

        const wrapper = shallow(<AddIssue index={0} onDeleteIssue={onDeleteIssueCallback} onChangeIssue={jest.fn()} issue={issue}/>);   

        let deleteButton = wrapper.find('#delete-issue');
        expect(deleteButton).toHaveLength(1);

        deleteButton.simulate('click');
        expect(onDeleteIssueCallback).toHaveBeenCalledTimes(1);
    });
});