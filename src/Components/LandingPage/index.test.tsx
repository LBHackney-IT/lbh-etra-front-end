import React from 'react';
import ReactDOM from 'react-dom';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import LandingPage from '.';
import { v4 as uuid } from 'uuid';
import { IServiceProvider } from '../../ServiceContext';
import { IGetMeetingDraftsUseCase } from '../../Boundary/GetMeetingDrafts';
import { mockMeeting } from '../../Mocks/MockMeetingFactory';
import { Location } from 'history';

configure({ adapter: new Adapter() });

const mockServiceProvider = createMockServiceProvider();

const mockLocation : Location = {state: {}, pathname: "", search: "", hash: ""}

it('Landing page component loads', () => {
    shallow(<LandingPage location={mockLocation}  />);
});

describe('When we go to render the landing page', () => {
    const wrapper = shallow(<LandingPage location={mockLocation} />);

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
        expect(options).toHaveLength(59);
    })

    it('Then start etra meeting button is shown', () => {
        const button = wrapper.find('[data-test="start-meeting"]');
        expect(button.text()).toBe("Start ETRA Meeting");
    })

    it('Then selected TRA is empty to begin with', () => {
        expect(wrapper.state("selectedTraId")).toBe("");
    })

    it('Then selected TRA can be changed and form becomes valid', () => {
        const newValue = uuid();
        const event = {currentTarget: { value : newValue}};
        const dropdown = wrapper.find('[data-test="tra-selection"]');

        dropdown.simulate("change", event);

        expect(wrapper.state("selectedTraId")).toBe(newValue);
        expect(wrapper.state("valid")).toBe(true);
        expect(wrapper.find('[data-test="start-meeting"]').props().disabled).toBe(false);
    })

    it('Then if state changes, dropdown value is updated automatically to reflect this', () => {
        const newValue = uuid();
        wrapper.setState({selectedTraId: newValue});

        const dropdown = wrapper.find('[data-test="tra-selection"]');

        expect(dropdown.props().value).toBe(newValue);
    })

    it('Then if start meeting button is clicked, redirect is set to true', () => {
        const newValue = uuid();
        wrapper.setState({selectedTraId: newValue});

        const button = wrapper.find('[data-test="start-meeting"]');
        button.simulate('click');

        expect(wrapper.state("redirect")).toBe(true);
    })
});

describe('When we go to render the landing page with no drafts', () => {
    const wrapper = shallow(<LandingPage location={mockLocation} />);

    it("draft list header is visible", () => {
        const element = wrapper.find('[data-test="draft-list-header"]');
        expect(element.text()).toBe("ETRA meetings for review by TRA representative");
    });

    it("then the no drafts text is visible", () => {
        const element = wrapper.find('[data-test="no-draft-meetings"]');
        expect(element.text()).toBe("No meetings found");
    });
});

const meetings = [
    mockMeeting("Meeting 1"),
    mockMeeting("Meeting 2")
]

function createMockServiceProvider() : IServiceProvider {
    const mockGetDrafts: IGetMeetingDraftsUseCase = {
        Execute: jest.fn(() => {
            return new Promise((resolve, reject) => { resolve(meetings); })
        })
    };
  
    return {
        get: jest.fn((service: string) => {
            return mockGetDrafts;
        })
    };
  };
