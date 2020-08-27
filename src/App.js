import React, {useCallback, useEffect, useMemo, useState} from 'react';

const App = () => {
    const [appValue, changeValue] = useState(23)
    const [visible, hide] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => hide((view) => !view), 5000);
        return () => clearTimeout(timer)
    }, [])

    if (visible) {
        return (
            <div className="container"
                 style={{padding: "10px"}}>
                <button className="btn btn-block btn-outline-warning"
                        style={{marginBottom: "5px"}}
                        onClick={() => {
                            hide(false)
                        }}> hide
                </button>

                <button className="btn btn-success btn-block btn-sm"
                        onClick={() => {
                            changeValue((inc) => inc + 1)
                        }}>INC
                </button>

                <div className="row">
                    <span className="col text-right"><HookCounter value={appValue}/></span>
                    <span className="col text-left"><ItemInfo id={appValue}/></span>
                </div>

                <button className="btn btn-info btn-block btn-sm"
                        onClick={() => {
                            changeValue((dec) => dec - 1)
                        }}>DEC
                </button>
            </div>
        )
    }

    return (
        <div className="container"
             style={{padding: "10px"}}>
            <button className="btn btn-block btn-outline-warning"
                    style={{marginBottom: "5px"}}
                    onClick={() => {
                        hide((view) => !view)
                    }}> show
            </button>
        </div>
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
        <div className="container"> hook value: {props.value}</div>
    )
}

const getItem = (id) => {
    return fetch(`http://swapi.dev/api/people/${id}/`)
        .then((person) => person.json())
        .then(data => data)
};

const useRequest = (request) => {
    const initData = useMemo(() => ({
        data: null,
        loading: true,
        error: false
    }), [])

    const [data, setData] = useState(initData)

    useEffect(() => {
        setData(initData);
        let loading = true;

        request()
            .then((result) => loading && setData({data: result, loading: false, error: false}))
            .catch(error => loading && setData({data: null, loading: false, error}));

        return () => loading = false;
    }, [request, initData])
    return data
}

const useItemInfo = (id) => {
    const request = useCallback(() => getItem(id), [id])
    return useRequest(request)
}

const ItemInfo = ({id}) => {
    const {data, loading, error} = useItemInfo(id)

    if (loading) {
        return (
            <div>...loading...</div>
        )
    }
    if (error) {
        return (
            <div>it`s does not work</div>
        )
    }

    return (
        <div className="container">{data.name}</div>
    )
}


export default App;