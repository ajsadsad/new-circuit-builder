import React from 'react';
import styles from '../css/AllGatesMenu.module.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import contextStyles from '../css/ContextMenu.module.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CGImg from '../../assets/compound_gate.svg';

export default function GatesMenu({ stdGates, faveGates, setDraggingGate, setDraggingGateNode, setLastClicked, addToFavGates }) {

    const standardGates = stdGates.map((index) => {
        return (JSON.parse([index]));
    })

    const stdGateImgs = standardGates.map((gate) => {
        return (
            <div class="col" style={{ minHeight: 120 }} key = {gate.qid}>
                <ContextMenuTrigger id="gateContextmenu" style={{"padding-left" : "25%"}}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 350, hide: 100 }}
                        overlay={
                            <Tooltip id="button-tooltip">
                                <strong> {gate.gateName} </strong> <br/>
                                {gate.description}
                            </Tooltip>
                        }
                    >
                    <img
                        className={styles.GateImg}
                        id={gate.qid}
                        gate={JSON.stringify(gate)}
                        src={require(`../../assets/${gate.img}`)}
                        draggable={true}
                        onDragStart={(e) => { e.stopPropagation(); setDraggingGateNode(e); setDraggingGate(gate); }}
                        onContextMenu={() => { setLastClicked(gate) }}
                        alt = {"gate img"}
                    />
                    </OverlayTrigger>
                    <p> {gate.gateName} </p>
                </ContextMenuTrigger>

            </div>

        )
    });

    const faveCompoundGateImgs = faveGates.map((gate) => {
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
        <div class=" accordion accordion-flush d-grid" id="accordionPanelsStayOpenExample">
            <div class="accordion-item d-grid" >
                <button class="btn btn-secondary rounded-0 collapsed" className={styles.button} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    <strong> Gates </strong>
                </button>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                    <div class="accordion-body" className={styles.accordionContent}>
                        <div class="row">
                            <div class = "col-6" style = {{"border-right" : "1px solid"}}>
                                Standard Gates
                                <div class="row">
                                    {stdGateImgs}
                                </div>
                            </div>
                            <div class = "col-6">
                                Compound & Favourite Gates
                                <div class="row">
                                    {faveCompoundGateImgs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenu id="gateContextmenu" className={contextStyles.ContextMenu}>
                    <MenuItem className={contextStyles.contextMenu__item} onClick={() => { addToFavGates()}}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                        </span>
                    </MenuItem>
            </ContextMenu>
        </div>

    );
}