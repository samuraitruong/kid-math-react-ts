import * as React from "react";
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
        this
            .props
            .onChange(this.props.id, ev.target.value);
    }
    public render() {
        return (
            <div className={"item" + (this.props.input ? " has-input " : "")} key={this.props.id}>
                < div className="formular">
                    <span>{this.props.left}</span>
                    < span >
                        {this.props.operator}</span>
                    < span >
                        {this.props.right}</span>
                </div>
                <div className="result">
                    <span>=</span>
                    <input
                        type="text"
                        value={this.props.input}
                        onChange={this
                            .onChange
                            .bind(this, this.props)}
                        placeholder="?" /> {this.props.showed && this.props.ok
                            ? <span className="tick ok">✓</span>
                            : null}
                    {this.props.showed && !this.props.ok && <span className="tick error">✗</span>}

                </div>
            </div >
        )
    }
}