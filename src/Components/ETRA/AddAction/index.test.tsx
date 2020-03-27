import React from 'react'
import AddAction from '.'
import {default as Adapter} from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme';
import {IssueFactory} from '../../../Factories/Issue/'
import { ServiceContainer, ServiceProvider } from '../../../ServiceContext';
import configureServices from '../../../serviceConfiguration';
import { IIssue } from '../../../Domain/Issues';
import { IBlockInfo } from '../../../Boundary/BlockInfo';

configure({adapter:new Adapter()});

const serviceContainer = new ServiceContainer();
configureServices(serviceContainer);
const mockfunction = jest.fn();
let issueFactory = new IssueFactory();
let issue = issueFactory.create();

const mockBlocks : IBlockInfo[] = [
    {id: "0", block: { name: "Block 1" }},
    {id: "1", block: { name: "Block 2" }}
];

it('Add Action component loads',() => {
    shallow( <ServiceProvider value={serviceContainer}>
        <AddAction readOnly={false} blocks={[]} index={0} onDeleteIssue={mockfunction} onChangeIssue={jest.fn()} issue={issue}/>
    </ServiceProvider>)
});

it('Issue notes can be changed', ()=>{

    const wrapper = mount( 
        <ServiceProvider value={serviceContainer}>
            <AddAction readOnly={false} blocks={[]} index={0} onDeleteIssue={mockfunction} onChangeIssue={jest.fn()} issue={issue}/>
        </ServiceProvider>)
    const event = { target: { name: 'notes', value: "hello"}};
    const notes = wrapper.find('[data-test="notes"]');

    notes.simulate('change', event);
    const issueState = wrapper.state("issue") as IIssue;

    expect(issueState.notes).toBe("hello");
 });

describe('when we go to render the Add Issue Component',()=>{
    const wrapper = mount(
        <ServiceProvider value={serviceContainer}>
            <AddAction readOnly={false} blocks={mockBlocks} index={0} onDeleteIssue={mockfunction} onChangeIssue={jest.fn()} issue={issue}/>
        </ServiceProvider>);

    it('Then the issue label and dropdown is shown', () => {
        const issueDropdown = wrapper.find('[data-test="issue-dropdown"]')
        expect(issueDropdown.exists()).toBe(true);

        const issueslabel = wrapper.find('[data-test="issue-label"]')
        expect(issueslabel.exists()).toBe(true);
    });

    it('Then the location label and dropdown is shown', () => {
        const locationDropdown = wrapper.find('[data-test="location-dropdown"]')
        expect(locationDropdown.exists()).toBe(true);

        const locationlabel = wrapper.find('[data-test="location-label"]')
        expect(locationlabel.exists()).toBe(true);
    });
    

    it('Then the location dropdown has the correct number of options', () => {
        //You need to mock the gateway that gives you the service locations as part of your service container mock
        //Then you can expect to get the correct number of options here
        expect(wrapper.find('[data-test="location-option"]')).toHaveLength(2);
    });


    it('Then we can delete the issue we added', () => {
        let deleteButton = wrapper.find('#delete-issue');
        expect(deleteButton).toHaveLength(1);

        deleteButton.simulate('click');
        expect(mockfunction).toHaveBeenCalledTimes(1);
    });

});