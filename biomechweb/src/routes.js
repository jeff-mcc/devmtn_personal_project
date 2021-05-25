import {Switch,Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import ProjectData from './components/ProjectData'

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/viewdata" component={Data} /> */}
        {/* <Route path="/about" component={About} /> */}
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/projectdata" component={ProjectData} />
    </Switch>
)