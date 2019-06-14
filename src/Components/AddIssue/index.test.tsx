import React from 'react'
import AddIssue from '.'
import {default as Adapter} from 'enzyme-adapter-react-16'
import { conditionalExpression } from '@babel/types';
import { configure, shallow, mount } from 'enzyme';
import {IssueFactory} from '../../Factories/Issue/'
import { ServiceContainer, IServiceProvider, ServiceProvider } from '../../ServiceContext';
import configureServices from '../../serviceConfiguration';

configure({adapter:new Adapter()});

const serviceContainer = new ServiceContainer();
configureServices(serviceContainer);

describe('when we go to render the Add Issue Component',()=>{
    let issueFactory = new IssueFactory();
    let issue = issueFactory.create();

    const wrapper = mount(
        <ServiceProvider value={serviceContainer}>
            <AddIssue index={0} onDeleteIssue={jest.fn()} onChangeIssue={jest.fn()} issue={issue}/>
        </ServiceProvider>);; 

    it('Add Issue component loads',() => {
        
    })

    it('Then we can delete the issue we added', () => {
        const onDeleteIssueCallback = jest.fn();

        let deleteButton = wrapper.find('#delete-issue');
        expect(deleteButton).toHaveLength(1);

        deleteButton.simulate('click');
        expect(onDeleteIssueCallback).toHaveBeenCalledTimes(1);
    });
});