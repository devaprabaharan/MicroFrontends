import React, {useRef, useEffect} from 'react';
import {mount} from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(()=>{
        console.log(`inside container MarketingApp.js history.location: ${JSON.stringify(history.location)}`);
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname, //send the initial state of the route to the subapp memory history
            // update the browser history objects pathname to the new path marketing sub app navigated to.
            //we can rename the property of the location object you are destructuring and rename it to nextPathname
            onNavigate:(location)=>{
                console.log(`location: ${location}`);
                const nextPathname = location.pathname;
                const currentPathname = history.location.pathname;
                if(currentPathname !== nextPathname){//to prevent infinite flow that each history object tell other it changed
                    //tell the history about the new path
                    history.push(nextPathname);
                    console.log(`the container noticed navigation inmarketing: ${nextPathname}`);
                }
            }
        });
        //anytime navigation occurs in container, call onParentNavigate
        history.listen(onParentNavigate);
    }, []);// empty array to limit calling the useEffect is called only once when MarketinApp is rendered.
    return <div ref={ref} />
}