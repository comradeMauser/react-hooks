import React, {useCallback, useEffect, useState} from 'react';

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


const getItem = (id) => {
    return fetch(`http://swapi.dev/api/people/${id}/`)
        .then((person) => person.json())
        .then(data => data)


};

const useRequest = (request) => {

    const [dataName, setData] = useState("loading")
    const [load, uploading] = useState(false)

    useEffect(() => {
        uploading(true);
        request()
            .then((result) => {
                load && setData(result);
            });
        return () => uploading(false)
    }, [request, load])

    return dataName
}

const useItemInfo = (id) => {
    const request = useCallback(() => getItem(id), [id])
    return useRequest(request)

}


const ItemInfo = ({id}) => {
    const data = useItemInfo(id)

    return (
        <div>{id}-{data && data.name}</div>
    )
}


export default App;