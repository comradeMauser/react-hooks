import React, {useState} from 'react';

const App = () => {

    const [appValue, changeValue] = useState(88)
    const [visible, hide] = useState(true)

    if (visible) {
        return (
            <div style={{padding: "10px"}}>
                <button className="btn btn-block btn-outline-warning"
                        style={{marginBottom: "5px"}}
                        onClick={() => {
                            hide(false)
                        }}> hide
                </button>

                <button className="btn btn-info"
                        onClick={() => {
                            changeValue((inc) => inc + 1)
                        }}>INC
                </button>

                <button className="btn btn-success"
                        onClick={() => {
                            changeValue((dec) => dec - 1)
                        }}>DEC
                </button>

                <div>
                    <HookCounter value={appValue}/>
                    <ClassCounter value={appValue}/>
                </div>
            </div>
        )
    }
    return (
        <button className="btn btn-block btn-outline-warning"
                style={{padding: "10px", margin: "5px"}}
                onClick={() => {
                    hide((sigh) => !sigh)
                }}> show</button>

    )
}

const HookCounter = (props) => {
    return (
        <div> hook value: {props.value}</div>
    )
}

class ClassCounter extends React.Component {

    componentDidMount() {
        console.debug("componentDidMount() ")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.debug("componentDidUpdate")
    }

    componentWillUnmount() {
        console.debug("componentWillUnmount")
    }

    render() {
        return (
            <div>class value: {this.props.value}</div>
        );
    }
}


export default App;