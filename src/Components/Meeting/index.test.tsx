import React from 'react';
import ReactDOM from 'react-dom';
import Meeting, { IMeetingRedirectProps } from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { shallow } from 'enzyme';
import ReviewMeeting from '../ReviewMeeting';
import { Location } from 'history';
import { ServiceProvider, IServiceProvider } from '../../ServiceContext';
import { IGetMeetingUseCase } from '../../Boundary/GetMeeting';
import { BrowserRouter } from 'react-router-dom';

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
//    mount(<ServiceProvider value={createMockServiceProvider()}>
//             <BrowserRouter>
//                 <Meeting location={mockLocation} />
//             </BrowserRouter>
//        </ServiceProvider>);
});

// describe('When we go to render the meeting', () => {
//     const wrapper = shallow(<Meeting location={mockLocation} />); 

//     it('Then the back link is shown', () => {
//         const lnkBack = wrapper.find('#lnkBack')
//         expect(lnkBack).toHaveLength(1);
//      });

//     it('title is displayed with correct TRA Name', () => {
//         const header = wrapper.find("h1");
//         expect(header.text()).toContain(`${traName} meeting`); 
//     });

//     it("review meeting component is rendered", () => {
//         const reviewMeeting = wrapper.find(ReviewMeeting);
//         expect(reviewMeeting).toHaveLength(1);
//     })
// });

function createMockServiceProvider() : IServiceProvider {
    const mockGetMeeting: IGetMeetingUseCase = {
        Execute: jest.fn(() => {
            return new Promise((resolve, reject) => { resolve(); })
        })
    };
   // private readonly getMeeting: IGetMeetingUseCase;
    return {
        get: jest.fn()
    
    };
  };

