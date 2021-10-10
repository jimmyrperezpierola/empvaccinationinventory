import React from 'react';
import { connect } from 'react-redux';
import './Loader.css';

const Loader = props => {
    return (
        <>
            {
                props.loading && <div className="loader">
                    <section className="loading verticle-align text-center">
                        <div className="lds-dual-ring">Loading...</div>
                    </section>
                </div>
            }
        </>
    );
}

export default Loader; 