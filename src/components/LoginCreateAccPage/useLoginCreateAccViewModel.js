import { useRef } from 'react'
import useLoginCreateAccModel from './useLoginCreateAccModel'

//viewModel - have to change the name, I don't think this application is large enough as is to require a view controller and view model
export default function useLoginCreateAccViewModel() {

    const { getCreateNewAccount, getLogin } = useLoginCreateAccModel();
    const regEmail = useRef("");
    const regPassword = useRef("");
    const regConfirmPassword = useRef("");

    function setRegEmail(input) {
        regEmail.current = input;
    }

    function setRegPassword(pw) {
        regPassword.current = pw;
    }

    function setRegConfirmPassword(pw) {
        regConfirmPassword.current = pw;
    }

    function onLoginClick() {
        getLogin(regEmail.current, regPassword.current);
    }

    const onCreateNewAccountClick = () => {
        getCreateNewAccount(regEmail.current, regPassword.current, regConfirmPassword.current);
    }

    return {
        setRegEmail,
        setRegPassword,
        setRegConfirmPassword,
        onLoginClick,
        onCreateNewAccountClick
    }
}