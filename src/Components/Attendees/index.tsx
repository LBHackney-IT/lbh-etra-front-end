import React from 'react';


export interface IAttendeesState {
    Councillors: string,
    HackneyStaff: string,
    NumberOfAttendees: number
}


export class Attendees extends React.Component<any, IAttendeesState> {

        public constructor(props: any) {
            super(props);
            this.state = {
                Councillors: "",
                HackneyStaff: "",
                NumberOfAttendees: 0,
            }
        }
       
        render() {
            return(
                <div>
                    <div 
                        className="back-arrow"> &#60;
                    </div>
                    <div 
                        className="back-link"><a id="lnkBack" href="#">Back</a>
                    </div>
                    <div className="AttendeeHeader">Meeting Attendees</div>
                </div>
                
                
            )
        }


}

export default Attendees