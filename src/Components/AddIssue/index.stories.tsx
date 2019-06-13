import React from 'react'
import AddIssue from '.'
import {storiesOf} from '@storybook/react'
import { IIssue } from '../../Domain/Issues';
import { IssueFactory } from '../../Factories/Issue';

const issueFactory = new IssueFactory();

storiesOf('AddIssue',module)
.add('Opens Correctly',()=>(
    <AddIssue
        index={1} 
        issue={issueFactory.create()}
        onChangeIssue={(issue: IIssue, index: number) => {console.log(`${index}: ${issue.IssueType.IssueType} ${issue.Notes}`)}}
        onDeleteIssue={(index: number) => {console.log(`Delete issue ${index}`)}}/>
));