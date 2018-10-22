import * as React from 'react';
interface ITextControlProp extends IItem {
    onChange: (id: number, value: string) => void;
    showed: boolean;
}
export default class TextControl extends React.Component<ITextControlProp> {
    constructor(props: ITextControlProp) {
        super(props)
    }
    public onChange(props: any, ev: any) {
        console.log("text box", ev.target.value);
        this.props.onChange(this.props.id, ev.target.value);
    }
    public render() {
        return (<div className="item" key={this.props.id}>
            <div className="formular">{this.props.left} {this.props.operator} {this.props.right} = </div>
            <div className="result">
                <input type="text" value={this.props.input} onChange={this.onChange.bind(this, this.props)} />
                {this.props.showed && this.props.ok ? <span className="tick ok">✓</span> : null}
                {this.props.showed && !this.props.ok && <span className="tick error">✗</span>}

            </div>
        </div >)
    }
}