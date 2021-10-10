import React from 'react';
import './Footer.css';
import MobileNavbar from './MobileNavbar';

const Footer = () => {
    return (
        <>
            <hr />              
            <footer className="footer-container">
                <div className="website-rights">
                    &copy; Kruger NS | Employee Vaccination Inventory
                </div>
            </footer>
            <MobileNavbar />
        </>
    );
}

export default Footer;
