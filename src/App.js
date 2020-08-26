import React, {useEffect, useState} from 'react';

const App = () => {
    const [appValue, changeValue] = useState(23)
    const [visible, hide] = useState(true)

    // useEffect(() => {
    //     const timer = setTimeout(() => hide((view) => !view), 5000);
    //     return () => clearTimeout(timer)
    // }, [])

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
                    {/*<ClassCounter value={appValue}/>*/}
                    <ItemInfo id={appValue}/>
                </div>
            </div>
        )
    }
    return (
        <button className="btn btn-block btn-outline-warning"
                style={{margin: "10px"}}
                onClick={() => {
                    hide((view) => !view)
                }}> show</button>

    )
}


const HookCounter = (props) => {

    useEffect(() => {
        console.error("Johnny, they`re in the trees!")
    }, [])
    useEffect(
        () => {
            console.debug("love smell napalm in the morning");
            return () => console.log("catharsis")
        }, []
    )
    return (
        <div> hook value: {props.value}</div>
    )
}


const useItemInfo = (id) => {

    const [name, setName] = useState("loading")
    const [load, uploading] = useState(false)

    useEffect(() => {
        uploading(true);
        fetch(`http://swapi.dev/api/people/${id}/`)
            .then((person) => person.json())
            .then((result) => {
                load && setName(result.name);
            });
        return () => uploading(false)
    }, [id, load])

    return name
}


const ItemInfo = ({id}) => {
    const name = useItemInfo(id)

    return (
        <div>{name}</div>
    )
}

/*class ClassCounter extends React.Component {

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
}*/

export default App;