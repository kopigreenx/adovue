import * as riot from 'riot'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './app.riot'
import ClientDisplay from './ClientDisplay.riot'

const mountApp = riot.component(App)

mountApp(document.getElementById('root'))
