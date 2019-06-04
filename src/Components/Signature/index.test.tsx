import React from 'react';
import ReactDOM from 'react-dom';
import Signature from './index';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow, mount } from 'enzyme';
import SignatureCanvas from 'react-signature-canvas';

configure({ adapter: new Adapter() });

describe('When using Signature component', () => {
  it('renders without crashing', () => {
      shallow(<Signature />);
   });

   it("displays signature component", () => {
        const wrapper = shallow(<Signature/>)
        const signatureCanvas = wrapper.find(SignatureCanvas);

        expect(signatureCanvas).toHaveLength(1);
   })

   it("doesn't render clear button when display value is false", () => {
        const signature = shallow(<Signature displayClearButton={false} />);
        const button = signature.find('.button-wrapper');

        expect(button).toHaveLength(0);
   });

   it("does render clear button when display value is true", () => {
        const signature = shallow(<Signature displayClearButton={true} />);
        const button = signature.find('.button-wrapper');

        expect(button).toHaveLength(1);
   })
});