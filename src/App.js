import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './assets/css/common.min.css';
import PATHS from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { checkTokenExpired } from './services/middleware';

import Header from './components/Header/Header';
import Home from './views/HomeView/Home';
import SignIn from './views/AuthView/SignIn';
import Employees from './views/EmployeesView';
import AddEmployee from './views/AddEmployeeView';
import EditEmployee from './views/EditEmployeeView';
import UpdateMyInfo from './views/UpdateMyInfo';
import Footer from './components/pages/Footer/Footer';
import Loader from './components/Loader';

const DEFAULT_TITLE = 'Employee Vaccination Inventory';

const RouteManagement = (props) => {
  const { title, path, component } = props;
  let pageTitle = title ? title : DEFAULT_TITLE
  document.title = pageTitle;
  window.scroll(0, 0);

  return <Route path={path} component={component} />;
}

function App() {
  useEffect(() => {
    store.dispatch(checkTokenExpired());
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>    
     <Router>
        <Header />
        <Loader />       
        <div className="app-grid">
           <Switch>
              <RouteManagement exact path={PATHS.HOME} component={Home} />
              <RouteManagement exact path={PATHS.SIGN_IN} component={SignIn} title="Sign In..." />
              <RouteManagement exact path={PATHS.ADMIN_EMPLOYEES} component={Employees} title="Employees" />                      
              <RouteManagement exact path={PATHS.ADD_EMPLOYEE} component={AddEmployee} title="Add Employee" />                      
              <RouteManagement exact path={PATHS.EDIT_EMPLOYEE} component={EditEmployee} title="EditEmployee" />
              <RouteManagement exact path={PATHS.UPDATE_MYINFO} component={UpdateMyInfo} title="Update My Info" />
              <RouteManagement exact path={PATHS.NOT_FOUND} component={Home} />
           </Switch>          
        </div>    
        <Footer />            
     </Router>    
    </Provider>      
  );
}

export default App;
