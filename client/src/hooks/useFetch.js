import { useState, useEffect } from "react";

const useFetch = () =>{
    const [data, setData] = useState({
        slug:"",
        results:[]
    })

    useEffect(()=>{

    },[data.slug])

    return
}

export default useFetch