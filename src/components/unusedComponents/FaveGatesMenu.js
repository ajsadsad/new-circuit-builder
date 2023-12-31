/**
 * @param {boolean} optionsView - True if options menu is viewable.
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 * @param {boolean} allGatesView - True if all gates menu is viewable.
 * @param {array[]} gates - Array of standard gates.
 * @param {function} setDraggingGate - Function used to track state of current gate being dragged from menu.
 * @param {function} setDraggingGateNode - Function used to track state of current gate being dragged from menu as a HTML Node.
 *
 */

import React from 'react';
import styles from '../css/AllGatesMenu.module.css';
import CGImg from '../../assets/compound_gate.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function FaveGatesMenu({ gates, setDraggingGate, setDraggingGateNode }) {


    const gateImgs = gates.map((gate) => {
        return (
            <div class="col" style={{ minHeight: 120}}>
                    {
                        gate.qid === "compound_gate" ?
                        <>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 200, hide: 300 }}
                            overlay={
                                <Tooltip id="button-tooltip">
                                    <strong> {gate.gateName} </strong> <br/>
                                    {gate.description}
                                </Tooltip>
                            }
                        >
                            <img
                                key = { gate.qid }
                                id = { gate.qid }
                                gate = { JSON.stringify(gate) }
                                src ={ CGImg }
                                draggable={true}
                                onDragStart={(e) => { e.stopPropagation(); setDraggingGateNode(e); setDraggingGate(gate); }}
                                alt = {"Compound Gate"}
                            />
                        </OverlayTrigger>
                            <p> { gate.gateName } </p>
                        </>
                    :
                    <>
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 200, hide: 300 }}
                            overlay={
                                <Tooltip id="button-tooltip">
                                    <strong> {gate.gateName} </strong> <br/>
                                    {gate.description}
                                </Tooltip>
                            }
                        >
                        <img
                            className={styles.GateImg}
                            key={gate.qid}
                            id={gate.qid}
                            gate={JSON.stringify(gate)}
                            src={require(`../../assets/${gate.img}`)}
                            draggable={true}
                            onDragStart={(e) => { e.stopPropagation(); setDraggingGateNode(e); setDraggingGate(gate); }}
                            alt = {"Standard Gate"}
                        />
                        </OverlayTrigger>
                        <p> {gate.gateName} </p>
                    </>
                    }
            </div>

        )
    });

    return (
        <div class=" accordion accordion-flush d-grid" id="accordionPanelsStayOpenExample" className={styles.AllGatesMenu} >
            <div class="accordion-item d-grid" >
                <button class="btn btn-secondary rounded-0 collapsed" className={styles.button} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                    {/* Fav Gates <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg> */}
                    Favourite & Compound Gates
                </button>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body" className={styles.accordionContent}>
                        <div class="row">
                            {gateImgs}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}