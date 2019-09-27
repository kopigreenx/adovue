import * as riot from 'riot'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './app.riot'

const mountApp = riot.component(App)

mountApp(document.getElementById('root'), {
    titleBar: "KopiGreen"
})