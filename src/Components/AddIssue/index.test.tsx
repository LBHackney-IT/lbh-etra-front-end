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
    it('Add Issue component loads',()=>{
        shallow(<AddIssue index={0} onDeleteIssue={(index)=> console.log("deleted issue")} onChangeIssues={(issues)=> console.log("changed issues")} issue={issue}/>)
    })
});