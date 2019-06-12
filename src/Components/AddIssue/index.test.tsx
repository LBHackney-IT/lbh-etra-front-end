import React from 'react'
import AddIssue from '.'
import {default as Adapter} from 'enzyme-adapter-react-16'
import { conditionalExpression } from '@babel/types';
import { configure, shallow } from 'enzyme';

configure({adapter:new Adapter()});
it('Add Issue component loads',()=>{
    shallow(<AddIssue issue={}/>)
})

describe('when we go to render the Add Issue Component',()=>{
 const wrapper = shallow(<AddIssue issueType="" issueLocation="" notes=""/>);
 let issueType=wrapper.find('#issue-type');
 expect(issueType.exists()).toBe(true);

});