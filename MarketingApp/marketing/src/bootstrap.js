import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';


const mount =(el, {onNavigate, defaultHistory, initialPath})=>{
    
    console.log(`inside marketing bootstrap defaultHistory: ${defaultHistory}`);
    console.log(`inside marketing bootstrap initialPath: ${initialPath}`);
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });

    console.log(`inside marketing bootstrap hsitory: ${JSON.stringify(history)}`);

    if(onNavigate){
        //whenever a navigation occurs in marketing sub app, it calls the onNavigate
        // callback function from Container
        console.log(`inside marketing bootstrap onNavigate called`);
        history.listen(onNavigate);
    }
    const root = createRoot(el); // Use createRoot instead of ReactDOM.render
    root.render(<App history={history} />);

    console.log(`inside marketing bootstrap : marketing rendered`);
   
   //mount function returns this object for container function can call and change marketing app
   return{
    //get the navigation change from the container's browser history and update the subapp memory history 
    onParentNavigate({location}){
        console.log(`inside marketing bootstrap : onParentNavigate`);
        const nextPathName = location.pathname;
        const {pathname} = history.location;
        if(pathname !== nextPathName){
            history.push(nextPathName);
            console.log('contianer just navigated')
        }
        
    }
   }
}

if(process.env.NODE_ENV === 'development'){
    let el = document.querySelector('#_markerting-dev-root');
    //assuming our container doesnt have an element with an id '_markerting-dev-root'
    if(el){
        //we are running this app in isolation, so use browser history instead of Memory history
        mount(el, {defaultHistory : createBrowserHistory()});
    }
}

// Context/Situation #1
// 1. we are running development in isolation, where local index.html is used and the element dev-products is available
// 2. running in production through the container app. There is no gaurentee that an element dev-products exists

export {mount};