import React, { useState } from 'react'
import useLoginOrCreateAccountModel from './useLoginCreateAccModel'

//viewModel - have to change the name, I don't think this application is large enough as is to require a view controller and view model
const useLoginCreateAccViewModel = () => {

    const { getCreateNewAccount, getLogin } = useLoginOrCreateAccountModel();
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    //const history = useNavigate();

    const onLoginClick = ( regEmail, regPassword ) => {
        getLogin(regEmail, regPassword);
    }

    const onCreateNewAccountClick = ( regEmail, regPassword, regConfirmPassword ) => {
        getCreateNewAccount(regEmail, regPassword, regConfirmPassword);
    }

    return {
        regEmail,
        regPassword,
        regConfirmPassword,
        setRegEmail,
        setRegPassword,
        setRegConfirmPassword,
        onLoginClick,
        onCreateNewAccountClick
    }
}

export default useLoginCreateAccViewModel