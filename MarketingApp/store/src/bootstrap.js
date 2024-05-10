import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount =(el, {onNavigate, defaultHistory, initialPath})=>{
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });

    if(onNavigate){
        //whenever a navigation occurs in marketing sub app, it calls the onNavigate
        // callback function from Container
        history.listen(onNavigate);
    }
   ReactDOM.render(<App history={history}/>, el);
   
   //mount function returns this object for container function can call and change marketing app
   return{
    //get the navigation change from the container's browser history and update the subapp memory history 
    onParentNavigate({pathname: nextPathName }){
        const {pathname} = history.location;
        if(pathname !== nextPathName){
            history.push(nextPathName);
            console.log('contianer just navigated')
        }
        
    }
   }
}

    
if(process.env.NODE_ENV === 'development'){
    let el = document.querySelector('#_dashboard-dev-root');
    //assuming our container doesnt have an element with an id '_markerting-dev-root'
    if(el){
        //we are running this app in isolation, so use browser history instead of Memory history
        mount(el);
    }
}

export {mount};