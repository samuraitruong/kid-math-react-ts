import * as Random from "random-js";
import * as React from "react";
import logo from "./math-logo.svg";
import TextControl from "./TextControl";
import "./App.css";
interface IProps {
    name?: string;
}

interface IState {
    level : number,
    items : IItem[],
    validated : boolean;
    unresolved : number;
    total : number;
}
export default class App extends React.Component < IProps,
IState > {
    constructor(props : any) {
        super(props);
        this.state = this.generateMath();
        this.onChange = this
            .onChange
            .bind(this);
        this.validate = this
            .validate
            .bind(this);
        this.reset = this
            .reset
            .bind(this);
    }
    public generateMath() : IState {
        const items = new Array < IItem > ();
        const total = Math.ceil((window.innerWidth / 310) * (window.innerHeight - 100) / 90);
        for (let lv = 1; lv <= total; lv++) {
            let left = Random.integer(1, 10)(Random.engines.browserCrypto)
            let right = Random.integer(1, 10)(Random.engines.browserCrypto)

            const rnd = Random.integer(1, 100)(Random.engines.browserCrypto) % 2;
            const operator = rnd === 0
                ? "+"
                : "-";
            if (operator === "-" && left < right) {
                const temp = left;
                left = right;
                right = temp;
            }
            items.push({
                id: lv, input: "", left, operator,
                // tslint:disable-next-line:no-eval
                result: eval(left + operator + right),
                right
            })
        }
        return {items, level: 7, total, unresolved: total, validated: false}
    }
    public reset() {
        const newSolve = this.generateMath();
        this.setState(newSolve);
    }
    public validate() {
        let items = [...this.state.items];
        items = items.map(x => {
            x.ok = x
                .input
                .toString() === x
                .result
                .toString();
            return x;
        });
        this.setState({items, validated: true});
    }
    public onChange(id : number, value : string) {
        let items = [...this.state.items];
        let resoleved = 0;
        items = items.map(x => {
            if (x.id === id) {
                x.input = value;
            }
            if (x.input) {
                resoleved++;
            }
            return x;
        });
        this.setState({
            items,
            unresolved: items.length - resoleved
        });
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Kids Math</h1>
                </header>
                <div className="App-intro">
                    <div className="Container">
                        {this
                            .state
                            .items
                            .map((item) => <TextControl
                                {...item}
                                key={item.id}
                                onChange={this.onChange}
                                showed={this.state.validated}/>)}

                    </div>
                    <div className="Buttons">
                        < button className="button" onClick={this.validate}>
                            Check
                        </button>
                        <button className="button" onClick={this.reset}>Reset</button>

                        <span>{this.state.unresolved}
                        </span>

                    </div>
                </div>
            </div>
        )
    }
}