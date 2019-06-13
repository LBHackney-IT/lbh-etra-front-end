import React from 'react'
import AddIssue from '.'
import {storiesOf} from '@storybook/react'
import { IIssue } from '../../Domain/Issues';

storiesOf('AddIssue',module)
.add('Opens Correctly',()=>(
    <AddIssue
        index={1} 
        onChangeIssue={(issue: IIssue, index: number) => {console.log(`${index}: ${issue.IssueType.IssueType} ${issue.Notes}`)}}
        onDeleteIssue={(index: number) => {console.log(`Delete issue ${index}`)}}/>
));