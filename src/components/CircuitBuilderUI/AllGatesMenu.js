/**
 * @param {boolean} optionsView - True if options menu is viewable.
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 * @param {boolean} allGatesView - True if all gates menu is viewable.
 * @param {array[]} gates - Array of standard gates.
 * @param {function} setDraggingGate - Function used to track state of current gate being dragged from menu.
 * @param {function} setDraggingGateNode - Function used to track state of current gate being dragged from menu as a HTML Node.
 */

import React, {useRef} from 'react';
import styles from '../css/AllGatesMenu.module.css';
import { Collapse } from 'bootstrap';

export default function AllGatesMenu ( { optionsView, faveGatesView, allGatesView, gates, setDraggingGate, setDraggingGateNode }  ) {


    const standardGates = gates.map((index) => {
        return(JSON.parse([index]));
    })

    const gateImgs = standardGates.map((gate) => {
        if(gate.qid === "xrot") {
            return (
                <div class="col" style={{ minHeight: 120 }}>
                    <img
                        className={styles.GateImg}
                        key={gate.qid}
                        id={gate.qid}
                        gate={JSON.stringify(gate)}
                        src={require(`../../assets/${gate.img}`)}
                        draggable={true}
                        onDragStart={(e) => { e.stopPropagation(); setDraggingGateNode(e); setDraggingGate(gate); }}
                    />
                    <p> {gate.gateName} </p>
                </div>
            )
        } else {
            return (
                <div class="col" style={{ minHeight: 120 }}>
                    <img
                        className={styles.GateImg}
                        key={gate.qid}
                        id={gate.qid}
                        gate={JSON.stringify(gate)}
                        src={require(`../../assets/${gate.img}`)}
                        draggable={true}
                        onDragStart={(e) => { e.stopPropagation(); setDraggingGateNode(e); setDraggingGate(gate); }}
                    />
                    <p> {gate.gateName} </p>
                </div>

            )
        }
    });

    return (
        <div>
            <div class=" accordion accordion-flush d-grid" id="accordionPanelsStayOpenExample" className={styles.AllGatesMenu} >
                <div class="accordion-item d-grid" >
                    <button class="btn btn-secondary rounded-0 collapsed" className={styles.button} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Gates <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
</svg>
                    </button>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                        <div class="accordion-body" className={styles.accordionContent}>
                            <div class="row">
                                {gateImgs}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    // if (allGatesView === true) {
    //     if (optionsView === false && faveGatesView === false) {
    //         return [
                // <div className={`${styles.AllGatesMenu} ${styles.AllGatesMenuNoOptionNoFave}`} ref={refContainer} >

                //     <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                //         Button with data-bs-target
                //     </button>
                //     <div class="collapse" id="collapseExample">

                //         {gateImgs}

                //         </div>
                //         {/* All Gates Menu
                //     width : {dimensions.width}
                //     height : {dimensions.height} */}



                // </div>
    //         ]
    //      } else if(optionsView === true && faveGatesView === false) {
    //         return <div className = {
    //                     `${ styles.AllGatesMenu }
    //                      ${ styles.AllGatesMenuWithOptionNoFave }` }
    //                     ref = { refContainer }>
    //                 {/* All Gates Menu
    //                  width : {dimensions.width}
    //                  height : {dimensions.height} */}
    //                  {
    //                    gateImgs
    //                  }
    //                 </div>
    //      } else if(optionsView === false && faveGatesView === true) {
    //         return <div className = {
    //                     `${ styles.AllGatesMenu }
    //                      ${ styles.AllGatesMenuNoOptionWithFave }` }
    //                     ref = { refContainer }>
    //                 {/* All Gates Menu
    //                  width : {dimensions.width}
    //                  height : {dimensions.height} */}
    //                  {
    //                    gateImgs
    //                  }
    //                 </div>
    //      }
    // } else {
    //     return <div style = {{display: "none"}}/>
    // }
}