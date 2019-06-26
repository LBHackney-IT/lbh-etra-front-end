import React from 'react';
import ReactDOM from 'react-dom';
import SaveMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { ISaveMeetingDraftUseCase } from '../../Boundary/SaveMeetingDraft';
import { IServiceProvider, ServiceProvider } from '../../ServiceContext';
import { IMeetingModel } from '../../Domain/Meeting';
import { IAttendees } from '../../Domain/Attendees';

configure({ adapter: new Adapter() });

const mockServiceProvider = createMockServiceProvider();

function mockAttendees() : IAttendees {
    return {
        Councillors: "Jim, Bob, Steve",
        HackneyStaff: "Fleb",
        NumberOfAttendees: 10
    }
}

it('Save Meeting component loads', () => {
   mount(
    <ServiceProvider value={mockServiceProvider}>
        <SaveMeeting issues={[]} signature="" onReviewLater={jest.fn()} onReviewNow={jest.fn()} attendees={mockAttendees()}/>
    </ServiceProvider>);
});

describe('When we render the "Save Meeting component"', ()  => {
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onReviewLater={jest.fn()} onReviewNow={jest.fn()} attendees={mockAttendees()}/>
        </ServiceProvider>);

    it('Then the "Save and email issue list to TRA" button is displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.text()).toBe('Save and email issue list to TRA');
    });

    it('Then the "TRA representative to review later" button is displayed', () => {
        var element = wrapper.find('#review-later');
        expect(element.text()).toBe("TRA representative to review later"); 
    })
});

describe('When we render the "Save Meeting component"', () => {
    describe('with zero attendees in form', () => {
        let attendees = mockAttendees();
        attendees.NumberOfAttendees = 0;
        const wrapper = mount(
            <ServiceProvider value={mockServiceProvider}>
                <SaveMeeting issues={[]} signature="" onReviewLater={jest.fn()} onReviewNow={jest.fn()} attendees={attendees}/>
            </ServiceProvider>);

        it('Then the "Save and email issue list to TRA" button is disabled', () => {
            const element = wrapper.find('#save-meeting')
            expect(element.props().disabled).toBe(true);
        });

        it('Then the "TRA representative to review later" button is disabled', () => {
            var element = wrapper.find('#review-later');
            expect(element.props().disabled).toBe(true); 
        })
    });
});

describe('When we click the "Save and email issue list to TRA" button', ()  => {
    const onReviewNow = jest.fn();
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onReviewLater={jest.fn()} onReviewNow={onReviewNow} attendees={mockAttendees()}/>
        </ServiceProvider>);; 
        const element = wrapper.find('#save-meeting');
        element.simulate('click');

    it('Then the "Save and email issue list to TRA" button is NOT displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.exists()).toBe(false);
    });

    it('Then the "TRA representative to review later" button is NOT displayed', () => {
        const element = wrapper.find('#review-later')
        expect(element.exists()).toBe(false);
    });

    it('Then the spinner is displayed', () => {
        const element = wrapper.find('.spinner')
        expect(element.exists()).toBe(true);
    });

    it('Then onReviewNow method is called', () => {
        expect(onReviewNow).toHaveBeenCalled();
    });
});

describe('When we click the "Save and email issue list to TRA" button', ()  => {
    const onReviewLater = jest.fn();
    const wrapper = mount(
        <ServiceProvider value={mockServiceProvider}>
            <SaveMeeting issues={[]} signature="" onReviewLater={onReviewLater} onReviewNow={jest.fn()} attendees={mockAttendees()}/>
        </ServiceProvider>);; 
    const element = wrapper.find('#review-later');
    element.simulate('click');

    it('Then the "Save and email issue list to TRA" button is NOT displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.exists()).toBe(false);
    });

    it('Then the "TRA representative to review later" button is NOT displayed', () => {
        const element = wrapper.find('#review-later')
        expect(element.exists()).toBe(false);
    });

    it('Then the spinner is displayed', () => {
        const element = wrapper.find('.spinner')
        expect(element.exists()).toBe(true);
    });

    it('Then onReviewLater method is called', () => {
        expect(onReviewLater).toHaveBeenCalled();
    });
});

function createMockServiceProvider() : IServiceProvider {
    const mockSaveMeeting: ISaveMeetingDraftUseCase = {
        Execute: jest.fn((model: IMeetingModel) => {
            return true;
        })
    };
  
    return {
        get: jest.fn((service: string) => {
            return mockSaveMeeting;
        })
    };
  };
