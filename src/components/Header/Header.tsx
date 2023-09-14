import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg'
import account_icon from '../../assets/account_icon.svg';

const Header = () => {

    return (<div className={styles.header}>
        <div className={styles.horizontalContainer}>
            <div className={styles.logo}>
                <img alt="Quokka" src={logo}/>
                <h1>Quokka</h1>
            </div>

            <div className={styles.menu}>
                <div className={styles.status} >
                    <p className={styles.statusLbl}>Quokka Status:</p>
                </div>

                <div className={styles.accountMenu}>
                    {
                            <div className={styles.loginNavLink}>
                                <img src={account_icon} />
                                <NavLink to="/login">Login/Create Account</NavLink>

                            </div>
                    }
                </div>
                <div className={styles.navButtons}>
                    <NavLink to="/About">About</NavLink>
                    <NavLink to="/login">Setup Quokka</NavLink>
                    <NavLink to="/CircuitBuilder">Circuit Builder</NavLink>
                    <NavLink to="/CircuitOutput">Circuit Output</NavLink>
                </div>
            </div>
        </div>
    </div>)
}


export default Header;
