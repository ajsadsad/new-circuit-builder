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


    const refContainer = useRef();

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
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Gates
                    </button>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse">
                        <div class="accordion-body" className={styles.accBody}>
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