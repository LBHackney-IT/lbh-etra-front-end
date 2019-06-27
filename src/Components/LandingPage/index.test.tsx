import React from 'react';
import ReactDOM from 'react-dom';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import LandingPage from '.';
import { v4 as uuid } from 'uuid';

configure({ adapter: new Adapter() });

it('Landing page component loads', () => {
    shallow(<LandingPage />);
});

describe('When we go to render the landing page', () => {
    const wrapper = shallow(<LandingPage />);

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
