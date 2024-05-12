import {mount} from 'dashboard/DashboardApp';
import React, {useRef, useEffect} from 'react';

export default () => {
    const ref = useRef(null);

    useEffect(()=>{
       mount(ref.current);
    }, []);// empty array to limit calling the useEffect is called only once when MarketinApp is rendered.
    return <div ref={ref} />
}