import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PATHS from '../../routes';
import { logout } from '../../actions/auth';
import { clearNotification } from '../../actions/notification';
import './Header.css';

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = useSelector(state => state.auth);
    const userInfo = useSelector(state => state.user);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };

    const handleEdit = () => {
        history.push(`/update-myinfo/${userInfo.id}`);
    };
      
      useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return() => window.removeEventListener('resize', showButton);  
      }, []);

    return (
        <>
        <header className="navbar">
            <div className="navbar-container container">
                    <Link to={PATHS.HOME} className='navbar-logo'>KRUGER CORP</Link>   
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>                                        
                        <li className='nav-item'>
                            <Link to={PATHS.HOME} className="nav-links">Home</Link>
                        </li>
                        {
                            isAuth.isAuthenticated && userInfo.isAdmin ? <>
                                    <li className='nav-item'><Link to={PATHS.ADMIN_EMPLOYEES} className="nav-links">Employees</Link> </li>
                                    <li className='nav-item'><Link to={PATHS.ADD_EMPLOYEE} className="nav-links">Admin Employee</Link> </li>
                                    <span onClick={() => { dispatch(logout()); }} className="nav logout-btn">Logout</span>
                                </> 
                                : isAuth.isAuthenticated && !userInfo.isAdmin ? <> 
                                    <li className='nav-item'><span className="nav-links" onClick={handleEdit}>Update Data</span> </li>
                                    <span onClick={() => { dispatch(logout()); }} className="nav logout-btn">Logout</span>
                                </> 
                                :  <>
                                    <li className='nav-btn'>
                                        { button ? (
                                            <Link to={PATHS.SIGN_IN} className="btn-link"><Button buttonStyle='btn--outline'>SIGN IN</Button></Link> 
                                            ) : (
                                                <Link to={PATHS.SIGN_IN} className='btn-link'>
                                                    <Button
                                                        buttonStyle='btn--outline'
                                                        buttonSize='btn--mobile'
                                                        onClick={closeMobileMenu}
                                                    >
                                                    SIGN IN
                                                    </Button>
                                              </Link>                                                
                                          )                                            
                                        }
                                    </li>
                                </>
                        }
                    </ul>
            </div>                   
        </header>
        <hr />            
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.user.isAdmin,
    id: state.user.id,
});

export default connect(mapStateToProps, {clearNotification})(Header); 