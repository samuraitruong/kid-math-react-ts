import * as React from "react";
import logo from "./math-logo.svg";
import TextControl from "./TextControl";
import "./App.css";
import resetIcon from "./assets/images/reset.png";
import checkIcon from "./assets/images/check.png";
interface IProps {
    name?: string;
}

interface IState {
    level: number,
    items: IItem[],
    validated: boolean;
    unresolved: number;
    total: number;
}
export default class App extends React.Component<IProps,
    IState> {
    constructor(props: any) {
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
    public randomNumber(minimum: number, maximum: number) {
        return Math.round(Math.random() * (maximum - minimum) + minimum);
    }

    public generateMath(): IState {
        const items = new Array<IItem>();
        const total = Math.ceil(((window.innerWidth - 40) / 350) * (window.innerHeight - 160) / 90);
        for (let lv = 1; lv <= total; lv++) {
            let left = this.randomNumber(1, 10);
            let right = this.randomNumber(1, 10);

            const rnd = this.randomNumber(1, 100) % 2;
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
        return { items, level: 7, total, unresolved: total, validated: false }
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
        this.setState({ items, validated: true });
    }
    public onChange(id: number, value: string) {
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
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Kids Math</h1>
                    <div className="Right">
                        <img src={checkIcon} onClick={this.validate} />
                        <img src={resetIcon} onClick={this.reset} />
                        <span className="Counter">{this.state.unresolved}
                        </span>
                    </div>
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
                                showed={this.state.validated} />)}

                    </div>

                </div>
            </div>
        )
    }
}