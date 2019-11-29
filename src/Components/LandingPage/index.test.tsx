import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, mount, ReactWrapper } from 'enzyme';
import LandingPage from '.';
import { v4 as uuid } from 'uuid';
import { IServiceProvider, ServiceProvider } from '../../ServiceContext';
import { IGetMeetingDraftsUseCase } from '../../Boundary/GetMeetingDrafts';
import { mockMeeting } from '../../Mocks/MockMeetingFactory';
import { Location } from 'history';
import { IMeetingModel } from '../../Domain/Meeting';
import faker from 'faker';
import { BrowserRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

const meetings : IMeetingModel[] = [
    mockMeeting("Meeting 1"),
    mockMeeting("Meeting 2")
]

const mockLocation : Location = {state: {}, pathname: "", search: "", hash: ""}

it('Landing page component loads', () => {
    mount(
        <ServiceProvider value={createMockServiceProvider([])}>
            <LandingPage location={mockLocation} />
        </ServiceProvider>
    );
});

describe('When we go to render the landing page', () => {
    let wrapper : ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;

    beforeEach(() => {
        wrapper = mount((
            <ServiceProvider value={createMockServiceProvider([])}>
                <LandingPage location={mockLocation}/>  
            </ServiceProvider>
            ));
      });

    it('Then form is not valid and button is disabled', () => {
        expect(wrapper.state("valid")).toBe(false);
        expect(wrapper.find('[data-test="start-meeting"]').props().disabled).toBe(true);
    })

    it('Then the header text is shown', () => {
        const headerText = wrapper.find('[data-test="header-text"]')
        expect(headerText.text()).toBe('ETRA Meetings');
    });

    it('Then the TRA selection dropdown is shown', () => {
        const dropdown = wrapper.find('[data-test="tra-selection"]');
        expect(dropdown).toHaveLength(1);
    })

    it('Then the dropdown label is correct', () => {
        const labelText = wrapper.find('[data-test="tra-selection-label"]')
        expect(labelText.text()).toBe('Select TRA');
    })

    it('Then dropdown has correct number of options (includes hidden default option)', () => {
        const options = wrapper.find('[data-test="tra-option"]');
        expect(options).toHaveLength(62);
    })

    it('Then start etra meeting button is shown', () => {
        const button = wrapper.find('[data-test="start-meeting"]');
        expect(button.text()).toBe("Start ETRA Meeting");
    })

    it('Then selected TRA is empty to begin with', () => {
        expect(wrapper.state("selectedTraId")).toBe("");
    })

//     it('Then selected TRA can be changed and form becomes valid', async () => {
//         const newValue = uuid();
        
//         wrapper.find('[data-test="tra-selection"]').simulate("change", {currentTarget: { value : newValue}});

//         expect(wrapper.state("selectedTraId")).toBe(newValue);
//         expect(wrapper.state("valid")).toBe(true);
//         expect(wrapper.find('[data-test="start-meeting"]').props().disabled).toBe(false);
//     })

//     it('Then if state changes, dropdown value is updated automatically to reflect this', () => {
//         const newValue = uuid();
//         wrapper.setState({selectedTraId: newValue});

//         const dropdown = wrapper.find('[data-test="tra-selection"]');

//         expect(dropdown.props().value).toBe(newValue);
//     })

//     it('Then if start meeting button is clicked, redirect is set to true', () => {
//         const newValue = uuid();
//         wrapper.setState({selectedTraId: newValue});

//         const button = wrapper.find('[data-test="start-meeting"]');
//         button.simulate('click');

//         expect(wrapper.state("redirect")).toBe(true);
//     })
 });

describe('When we go to render the landing page with no drafts', () => {
    const wrapper = mount(
        <ServiceProvider value={createMockServiceProvider([])}>
            <LandingPage location={mockLocation} />
        </ServiceProvider>
    );

    it("draft list header is visible", () => {
        const element = wrapper.find('[data-test="draft-list-header"]');
        expect(element.text()).toBe("ETRA meetings for review by TRA representative");
    });

    it("then the no drafts text is visible", () => {
        const element = wrapper.find('[data-test="no-draft-meetings"]');
        expect(element.text()).toBe("No meetings found");
    });
});

describe('When we go to render the landing page with drafts', () => {
    const wrapper = mount(
        <ServiceProvider value={createMockServiceProvider(meetings)}>
            <BrowserRouter>
                <LandingPage location={mockLocation} />
            </BrowserRouter>
        </ServiceProvider>
    );

    const page = wrapper.find(LandingPage);

    it("draft list header is visible", () => {
        const element = page.find('[data-test="draft-list-header"]');
        expect(element.text()).toBe("ETRA meetings for review by TRA representative");
    });

    // it("then the no drafts text is not visible", () => {
    //     const element = page.find('[data-test="no-draft-meetings"]');
    //     expect(element).toHaveLength(0);
    // });

    // it("Then it loads the list of drafts", () => {
    //     const drafts = page.find('[data-test="meeting-draft"]')
    //     expect(drafts).toHaveLength(2);
    // })
});

// describe('When we go to render the landing page with a traId in the querystring', () => {
//     const traId = faker.random.number().toString();
//     const thisLocation : Location = {search: `?traId=${traId}`, pathname: "", state: {}, hash: ""}
//     const wrapper = mount(
//         <ServiceProvider value={createMockServiceProvider([])}>
//                 <LandingPage location={thisLocation} /> 
//         </ServiceProvider>
//     );

//     it('Then state is set to redirect to meeting page', () => {
//         expect(wrapper.state("selectedTraId")).toBe(traId);
//         expect(wrapper.state("redirect")).toBe(true);
//         expect(wrapper.state("valid")).toBe(true);
//     })
// });

function createMockServiceProvider(draftsToReturn: IMeetingModel[]) : IServiceProvider {
    const mockGetDrafts: IGetMeetingDraftsUseCase = {
        Execute: jest.fn(() => {
            return new Promise((resolve, reject) => { resolve(draftsToReturn); })
        })
    };
  
    return {
        get: jest.fn((service: string) => {
            return mockGetDrafts;
        })
    };
  };
