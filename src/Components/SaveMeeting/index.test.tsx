import React from 'react';
import ReactDOM from 'react-dom';
import SaveMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { ISaveMeetingUseCase, ISaveMeetingInputModel } from '../../Boundary/SaveMeeting';
import { SaveMeetingOutputModel } from '../../UseCases/SaveMeeting';
import { IServiceProvider, ServiceProvider } from '../../ServiceContext';
import { IAttendees } from '../Attendees';

configure({ adapter: new Adapter() });

const mockServiceProvider = createMockServiceProvider();

function mockAttendees() : IAttendees {
    return {
        Councillors: "Jim, Bob, Steve",
        HackneyStaff: "Fleb",
        NumberOfAttendees: 10
    }
}

it('Meeting component loads', () => {
   mount(
    <ServiceProvider value={mockServiceProvider}>
        <SaveMeeting issues={[]} signature="" onSaveComplete={() => {}} attendees={mockAttendees()}/>
    </ServiceProvider>);
});

describe('When we render the "Save Meeting component"', ()  => {
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onSaveComplete={() => {}}  attendees={mockAttendees()}/>
        </ServiceProvider>);

    it('Then the "Save and email issue list to TRA" button is displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.text()).toBe('Save and email issue list to TRA');
    });
});

describe('When we click the "Save and email issue list to TRA" button', ()  => {
    const onSaveComplete = jest.fn();
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onSaveComplete={onSaveComplete} attendees={mockAttendees()}/>
        </ServiceProvider>);; 
    const element = wrapper.find('#save-meeting');
    element.simulate('click');

    it('Then the "Save and email issue list to TRA" button is NOT displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.exists()).toBe(false);
    });

    it('Then the spinner is displayed', () => {
        const element = wrapper.find('.spinner')
        expect(element.exists()).toBe(true);
    });

    it('Then onSaveComplete method is called', () => {
        expect(onSaveComplete).toHaveBeenCalled();
    });
});

function createMockServiceProvider() : IServiceProvider {
  
    const mockSaveMeeting: ISaveMeetingUseCase = {
        Execute: jest.fn((model: ISaveMeetingInputModel) => {
            return new SaveMeetingOutputModel(true);
        })
    };
  
    return {
        get: jest.fn((service: string) => {
            return mockSaveMeeting;
        })
    };
  };
