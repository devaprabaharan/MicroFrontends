import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount =(el)=>{
   ReactDOM.render(<App/>, el);
}

if(process.env.NODE_ENV === 'development'){
    let el = document.querySelector('#_markerting-dev-root');
    //assuming our container doesnt have an element with an id '_markerting-dev-root'
    if(el){
        //we are running this app in isolation
        mount(el);
    }
}

// Context/Situation #1
// 1. we are running development in isolation, where local index.html is used and the element dev-products is available
// 2. running in production through the container app. There is no gaurentee that an element dev-products exists

export {mount};