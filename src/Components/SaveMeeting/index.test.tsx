import React from 'react';
import ReactDOM from 'react-dom';
import SaveMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { ServiceProvider } from '../../Services/ServiceContext';
import { ISaveMeetingUseCase, ISaveMeetingInputModel } from '../../Boundary/SaveMeeting';
import { SaveMeetingOutputModel } from '../../UseCases/SaveMeeting';
import { IServiceProvider } from '../../Services/ServiceContainer';

configure({ adapter: new Adapter() });

const mockServiceProvider = createMockServiceProvider();

it('Meeting component loads', () => {
   mount(
    <ServiceProvider value={mockServiceProvider}>
        <SaveMeeting issues={[]} signature="" onSaveComplete={() => {}}/>
    </ServiceProvider>);
});

describe('When we render the "Save Meeting component"', ()  => {
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onSaveComplete={() => {}}/>
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
            <SaveMeeting issues={[]} signature="" onSaveComplete={onSaveComplete}/>
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
