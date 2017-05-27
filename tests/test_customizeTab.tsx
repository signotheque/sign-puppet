import * as React from "react";
import * as ReactDOM from "react-dom";

import { CustomizeTab, CustomizeInput } from "../src/components/customizeTab";
import { CustomizeInputMap, CustomPoseUtils } from "../src/customPoseUtils";


import { SignPuppetApp } from "../src/app";

let lSignPuppetApp: SignPuppetApp = new SignPuppetApp();
lSignPuppetApp.create();

let lCustomPoses: { id: string, label: string, inputs: CustomizeInputMap, sepranks: Array<number> } = {
    id: "right_hand_position",
    label: "Right hand position",
    inputs: CustomPoseUtils.buildHandCustomPositions("r"),
    sepranks: [4,4,4,3,3]

};

const v = lCustomPoses;
let lInputArray = [];
let lAccum=-1;
let lSepRankAccum=lCustomPoses.sepranks.map(item=>{lAccum=lAccum+item; return lAccum;});
let i=0;
for (let lInputKey in v.inputs) {
    lInputArray.push(v.inputs[lInputKey]);
    if (lSepRankAccum.indexOf(i)!==-1) {
        lInputArray.push(new CustomizeInput());
    }
    i++;
}


const cCanvasStyle = {
    margin: 'auto',
    display: 'block'
};

let afterRenderCallback = (component?: React.Component<any, React.ComponentState> | Element) => {
    lSignPuppetApp.bind("the_canvas");
};
ReactDOM.render(
    <div>
        <canvas id="the_canvas" width="600" height="400" style={cCanvasStyle}></canvas>

        <CustomizeTab key="mytab" id="mytab" inputs={lInputArray} />

    </div>,
    document.getElementById("example"),
    afterRenderCallback
);

