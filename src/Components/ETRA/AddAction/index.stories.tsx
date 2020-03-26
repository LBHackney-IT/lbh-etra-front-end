import React from 'react'
import AddAction from '.'
import {storiesOf} from '@storybook/react'
import { IIssue } from '../../../Domain/Issues';
import { IssueFactory } from '../../../Factories/Issue';
import { ServiceContainer, IServiceProvider, ServiceProvider } from '../../../ServiceContext';
import configureServices from '../../../serviceConfiguration';

const issueFactory = new IssueFactory();

const serviceContainer = new ServiceContainer();
configureServices(serviceContainer);

storiesOf('AddIssue',module)
.add('Opens Correctly',()=>(
    <ServiceProvider value={serviceContainer}>
        <AddAction
            blocks={[]}
            readOnly={false}
            index={1} 
            issue={issueFactory.create()}
            onChangeIssue={(issue: IIssue, index: number) => {console.log(`${index}: ${issue.issueType.issueType} ${issue.notes}`)}}
            onDeleteIssue={(index: number) => {console.log(`Delete issue ${index}`)}}/>
    </ServiceProvider>
));