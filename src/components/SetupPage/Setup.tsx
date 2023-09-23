import React from 'react';
import { useDispatch } from 'react-redux';
// import {openModal} from '../../redux/actions/modalsAction';
import styles from './Setup.module.scss';
// import {Modal} from "../../common/classes";
import { Button } from "../LoginCreateAccPageUI/Button/Button.tsx"; // Don't want this take it out. Just kept it in to defbug.

const Setup : React.FC = () => {
    const dispatch = useDispatch();

    return (<div className={styles.setup}>
        <p>Instructions/informational page for how to connect the mobile to Quokka & also Quokka to the circuit builder</p>
        <p>Cater for standard text and images. This page needs to work on all devices.</p>
        <Button
            types={['standardBtn']}
            name='Connect device'
            onClick={() => {
                //open connection modal
                // dispatch(openModal(new Modal('ConnectionModal', 'StartConnection')));
                console.log("*insert functionatlity*");
            }}
        />
    </div>)
}

export default Setup;
