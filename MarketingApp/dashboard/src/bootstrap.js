import Dashboard from './components/Dashboard';
import { createApp } from 'vue';

const mount =(el)=>{
    const app = createApp(Dashboard);
    app.mount(el);
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