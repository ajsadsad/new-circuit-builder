import React from 'react';
import underlay_quokka_icon from '../../assets/underlay_quokka_icon.svg';
import useLoginCreateAccViewModel from './useLoginCreateAccViewModel';
import styles from './LoginCreateAccount.module.scss';
import { Button } from '../LoginCreateAccPageUI/Button/Button.tsx'
import { Input } from '../LoginCreateAccPageUI/Input/Input.tsx'

const LoginOrCreateAccount = () => {

    const { regEmail,
        regPassword,
        regConfirmPassword,
        setRegEmail,
        setRegPassword,
        setRegConfirmPassword,
        onLoginClick,
        onCreateNewAccountClick } = useLoginCreateAccViewModel();

    return (
        <div className={styles.container}>
            <img src={underlay_quokka_icon}/>
            <hr className={styles.divider}/>
            <div className={styles.loginOrCreateAccount}>
            <div className={styles.login}>
                <h2>Login to Quokka</h2>
                <Input
                    type="text"
                    styleTypes={['default']}
                    onChange={(event) =>
                    {
                        setRegEmail(event.target.value)
                    }}
                    placeholder="Email Address"/>
                <Input
                    type="password"
                    styleTypes={['default']}
                    onChange={(event) =>
                    {
                        setRegPassword(event.target.value)
                    }}
                    placeholder="Password"/>
                <Button
                    name="Login"
                    types={["loginBtn"]}
                    onClick={onLoginClick(regEmail, regPassword)}/>
                <button
                    className={styles.forgotBtn}
                    onClick={console.log("To add in still")}>Forgot Password?
                </button>

            </div>
            <div className={styles.createAccount}>
                <h2>Create account</h2>
                <p>
                    Creating an account allows you to access <br/>
                    the full functionality of the Quokka <br/>
                    interface including the ability to save <br/>
                    circuits and compound gates.
                </p>
                <Input
                    placeholder="Email Address"
                    type="text"
                    onChange={(event) =>
                    {
                        setRegEmail(event.target.value)
                    }}
                    styleTypes={['default']}
                />
                <Input
                    type="password"
                    styleTypes={['default']}
                    onChange={(event) =>
                    {
                        setRegPassword(event.target.value)
                    }}
                    placeholder="Create Password"
                />
                <Input
                    type="password"
                    styleTypes={['default']}
                    onChange={(event) =>
                    {
                        setRegConfirmPassword(event.target.value)
                    }}
                    placeholder="Confirm Password"
                />
                <Button
                    name="Login"
                    types={["loginBtn"]}
                    onClick={onCreateNewAccountClick(regEmail, regPassword, regConfirmPassword)}/>
            </div>
            </div>
        </div>
    )
}

export default LoginOrCreateAccount;
