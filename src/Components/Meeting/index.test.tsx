import React from 'react';
import ReactDOM from 'react-dom';
import Meeting, { IMeetingRedirectProps } from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ReviewMeeting from '../ReviewMeeting';
import { Location } from 'history';

configure({ adapter: new Adapter() });

const traName = "Gotham City TRA"

const mockLocation : Location<IMeetingRedirectProps> = 
    { 
        pathname: "test", 
        search: "", 
        hash: "", 
        state: { 
            selectedTra: {
                patch: {
                    patchId: "",
                    officerName: "",
                    id: "",
                    tras: []
                },
                tra: {
                    id: 10,
                    name: traName,
                    blocks: []
                }
            }
        }
    };

it('Meeting component loads', () => {
   shallow(<Meeting location={mockLocation} />);
});

describe('When we go to render the meeting', () => {
    const wrapper = shallow(<Meeting location={mockLocation} />); 

    it('Then the back link is shown', () => {
        const lnkBack = wrapper.find('#lnkBack')
        expect(lnkBack).toHaveLength(1);
     });

    it('title is displayed with correct TRA Name', () => {
        const header = wrapper.find("h1");
        expect(header.text()).toContain(`${traName} meeting`); 
    });

    it("review meeting component is rendered", () => {
        const reviewMeeting = wrapper.find(ReviewMeeting);
        expect(reviewMeeting).toHaveLength(1);
    })
});
