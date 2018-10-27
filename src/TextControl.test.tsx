import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextControl from './TextControl';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const onChange = (id: number, value: string): void => {
        console.log("OK");
    };
    ReactDOM.render(<TextControl onChange={onChange} input="" showed={true} id={1} left={1} operator="+" right={1} result={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
