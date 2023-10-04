/**
 * @param {boolean} optionsView - True if options menu is viewable.
 * @param {boolean} faveGatesView - True if fave gates menu is viewable.
 * @param {boolean} allGatesView - True if all gates menu is viewable.
 * @param {array[]} gates - Array of standard gates.
 * @param {function} setDraggingGate - Function used to track state of current gate being dragged from menu.
 * @param {function} setDraggingGateNode - Function used to track state of current gate being dragged from menu as a HTML Node.
 */

import React, {useRef} from 'react';
import styles from '../../CircuitBuilderPage/CircuitBuilder.module.scss';
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
                        src={require(`../../../assets/${gate.img}`)}
                        draggable={true}
                        onDragStart={(e) => { setDraggingGateNode(e); setDraggingGate(gate); }}
                    />
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
                        src={require(`../../../assets/${gate.img}`)}
                        draggable={true}
                        onDragStart={(e) => { setDraggingGateNode(e); setDraggingGate(gate); }}
                    />

                </div>
                
            )
        }
    });

    return (
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Accordion Item #1
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        {/* All Gates Menu
                        width : {dimensions.width}
                        height : {dimensions.height} */}
                        <div class="container text-center">
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