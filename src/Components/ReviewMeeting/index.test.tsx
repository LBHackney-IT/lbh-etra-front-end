import React from 'react';
import ReactDOM from 'react-dom';
import ReviewMeeting, { ReviewMeetingDisplayState } from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Signature from '../Signature';
import SaveMeeting from '../SaveMeeting';
import Confirmation from '../Confirmation Page';;
import ConfirmLater from '../ConfirmLater';
import { ISignOff } from '../../Domain/SignOff';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<ReviewMeeting onSaveComplete={jest.fn()} />);
});

describe('When we display the review meeting component', ()  => {
    const wrapper = shallow(<ReviewMeeting onSaveComplete={jest.fn()}/>);

    it('Then the save "Signature of TRA representative" text and component is displayed', () => {
        const element = wrapper.find('.signature-of-TRA-rep')
        expect(element.text()).toBe('Signature of TRA representative');

        const signatureComponent = wrapper.find(Signature);
        expect(signatureComponent).toHaveLength(1);
    });

    it('Then the save "Role of TRA representative" text is displayed', () => {
        const element = wrapper.find('.role-of-TRA-representative')
        expect(element.text()).toBe('Role of TRA representative');
    });

    it('Then the Chair radio button is displayed', () => {
        const element = wrapper.find('#chair')
        expect(element).toHaveLength(1);
        expect(element.children('input').props()['name']).toEqual("tra-role");
    });

    it('Then the Vice Chair radio button is displayed', () => {
        const element = wrapper.find('#vice-chair')
        expect(element).toHaveLength(1);
        expect(element.children('input').props()['name']).toEqual("tra-role");
    });

    it('Then the Secretary radio button is displayed', () => {
        const element = wrapper.find('#secretary')
        expect(element).toHaveLength(1);
        expect(element.children('input').props()['name']).toEqual("tra-role");
    });

    it('Then the Treasurer radio button is displayed', () => {
        const element = wrapper.find('#treasurer')
        expect(element).toHaveLength(1);
        expect(element.children('input').props()['name']).toEqual("tra-role");
    });

    it('Then selecting the radio buttons updates role', () => {
        const element = wrapper.find('#treasurer').children('input');
        element.simulate('change', { currentTarget: { value: "Treasurer" }});

        const signOff = wrapper.state("signOff") as ISignOff;
        expect(signOff.role).toBe("Treasurer");
    })

    it('Then the SaveMeeting component is displayed', () => {
        const element = wrapper.find(SaveMeeting)
        expect(element).toHaveLength(1);
    });

    describe('And we change the page state to ReviewComplete', ()  => {
        it('Then the Confirmation component is displayed', () => {
            wrapper.setState({pageState: ReviewMeetingDisplayState.ReviewComplete})
            const element = wrapper.find(Confirmation);
            expect(element).toHaveLength(1);
        });
    });

    describe('And we change the page state to ReviewLater', ()  => {
        it('Then the ConfirmLater component is displayed', () => {
            wrapper.setState({pageState: ReviewMeetingDisplayState.ReviewLater})
            const element = wrapper.find(ConfirmLater);
            expect(element).toHaveLength(1);
        });
    });
});
