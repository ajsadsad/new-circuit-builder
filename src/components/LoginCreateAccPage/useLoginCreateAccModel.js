import APIClient from '../../api/APIClient.ts'
import { useNavigate } from "react-router-dom";

export default function useLoginCreateAccModel() {

    const history = useNavigate();

    const getLogin = async (regEmail, regPassword) => {
        const response = await authLogin(regEmail, regPassword);
        if(response) {
            history('/circuitBuilder');
            console.log("Succesful Login");
        }
    }

    const authLogin = async (email, password) => {
        const apiClient = new APIClient();
        try {
            const response = await apiClient.authService.login({
                email: email,
                password: password
            });
            if (response?.status === 201) {
                if (response.data.access_token) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("userEmail", email);
                }
                return true;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const getCreateNewAccount = async (regEmail, regPassword, regConfirmPassword) => {
        const accCreateResponse = await authAccCreation(regEmail, regPassword, regConfirmPassword);
        if(accCreateResponse){
            history('/circuitBuilder');
            console.log("Succesful Account Creation");
        }
    }

    const authAccCreation = async (email, password1, password2) => {
        const apiClient = new APIClient();
        try {
            const response = await apiClient.authService.register({
                email: email,
                password : password1,
                confirmPassword : password2
            });
            if (response?.status === 201) {
               return authLogin(email, password1);
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return {
        getCreateNewAccount,
        getLogin,
    }

}