import * as riot from 'riot'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './app.riot'
import ClientDisplay from './ClientDisplay.riot'

const mountApp = riot.component(App)

riot.register('client-display', ClientDisplay)
mountApp(document.getElementById('root'), {
    titleBar: "Mokhamad Rizkianto"
})