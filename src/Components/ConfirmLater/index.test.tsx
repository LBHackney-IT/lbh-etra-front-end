import React from 'react';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ConfirmLater from '.';

configure({ adapter: new Adapter() });

it('Confirm Later component loads', () => {
   shallow(<ConfirmLater />);
});

describe('Given that we render the component', () => {
   const wrapper = shallow(<ConfirmLater />);

         it('Then the correct message should be visible', () => {
            // const message1 = wrapper.find('[data-test="message-one"]');
            // const message2 = wrapper.find('[data-test="message-two"]');

            // expect(message1.text()).toBe('Any issues have been saved and emailed to the TRA representative.');
            // expect(message2.text()).toBe('You can access the issues from your work tray.'); 
         });
  });
