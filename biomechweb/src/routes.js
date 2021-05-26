import {Switch,Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ProjectData from './components/ProjectData'
import ViewData from './components/ViewData'

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/data" component={ViewData} />
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/projectdata/:project_id" component={ProjectData} />
    </Switch>
)