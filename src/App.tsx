import * as Random from "random-js";
import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import TextControl from "./TextControl";
export interface IProps {
    name?: string;
}


interface IState {
    level: number,
    items: IItem[],
    validated: boolean;
}
class App extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: this.generateMath(),
            level: 7,
            validated: false
        }
        this.onChange = this.onChange.bind(this);
        this.validate = this.validate.bind(this);
        this.reset = this.reset.bind(this);
    }
    public generateMath() {
        const items = new Array<IItem>();
        for (let lv = 1; lv <= 21; lv++) {
            const left = Random.integer(1, 10)(Random.engines.browserCrypto)
            const right = Random.integer(1, 10)(Random.engines.browserCrypto)

            items.push({
                id: lv,
                input: "",
                left,
                operator: "+",
                result: left + right,
                right,
            })
        }
        return items;
    }
    public reset() {
        const items = this.generateMath();
        this.setState({ items, validated: false });
    }
    public validate() {
        let items = [...this.state.items];
        items = items.map(x => {
            x.ok = x.input.toString() === x.result.toString();
            return x;
        });
        this.setState({ items, validated: true });
    }
    public onChange(id: number, value: string) {
        let items = [...this.state.items];
        items = items.map(x => {
            if (x.id === id) {
                x.input = value;
            }
            return x;
        });
        this.setState({ items });
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Kids Math</h1>
                </header>
                <div className="App-intro">
                    <div className="Container">
                        {this.state.items.map((item) => <TextControl {...item} key={item.id} onChange={this.onChange} showed={this.state.validated} />)}

                        <button className="button" onClick={this.validate}>Check</button>
                        <button className="button" onClick={this.reset}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
