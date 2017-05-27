import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/hello";
import { PoseButtons } from "./components/poseButtons";

import { CustomizeButtons, CustomizeButton } from "./components/customizeButtons";
import { CustomizeTab, CustomizeInput } from "./components/customizeTab";
import { CustomizeInputMap, CustomPoseUtils } from "../src/customPoseUtils";

import { SignPuppetApp } from "./app";

let lSignPuppetApp: SignPuppetApp = new SignPuppetApp();
lSignPuppetApp.create();
lSignPuppetApp.bind("the_canvas");
let lPoses = {
    body: [
        { href: "forward", label: "Forward" },
        { href: "out", label: "Out" },
        { href: "down", label: "Down" },
        { href: "in_pose", label: "In" },
        { href: "default_pose", label: "Default" }
    ],


    hand: [
        { href: "s", label: "Fist" },
        { href: "5", label: "Five" },
        { href: "A", label: "Thumb" },
        { href: "1", label: "Point" },
        { href: "B", label: "Palm" }
    ],

    face: [
        { href: "wide", label: "Up extreme" },
        { href: "narrow", label: "Down extreme" },
        { href: "teeth", label: "Teeth" },
        { href: "tongue", label: "Tongue" },
        { href: "default_face", label: "Default" }
    ]
}


let lCustomPoses: { [key: string]: { id: string, label: string, inputs: CustomizeInputMap, sepranks: Array<number> } } = {};
lCustomPoses = {
    rightHandPosition: {
        id: "right_hand_position",
        label: "Right hand position",
        inputs: CustomPoseUtils.buildHandCustomPositions("r"),
        sepranks: [4, 4, 4, 3, 3]
    },
    rightHandPose: {
        id: "right_hand_pose",
        label: "Right hand fingers",
        inputs: CustomPoseUtils.buildHandCustomFingers("r"),
        sepranks: [4, 4, 4, 4, 5]
    },
    leftHandPosition: {
        id: "left_hand_position",
        label: "Left hand position",
        inputs: CustomPoseUtils.buildHandCustomPositions("l"),
        sepranks: [4, 4, 4, 3, 3]
    },
    leftHandPose: {
        id: "left_hand_pose",
        label: "Left hand fingers",
        inputs: CustomPoseUtils.buildHandCustomFingers("l"),
        sepranks: [4, 4, 4, 4, 5]
    },
    headAndBody: {
        id: "head_and_body",
        label: "Head and body",
        inputs: CustomPoseUtils.buildHeadAndBodyCustom(),
        sepranks: [4, 4, 3, 1, 2, 5, 1]
    }
}

let lCustomButtons: Array<CustomizeButton> = [];
let lCustomTabs = [];
for (let lCustomPoseKey in lCustomPoses) {
    const v = lCustomPoses[lCustomPoseKey];
    lCustomButtons.push({ id: v.id, label: v.label });
    let lInputArray = [];
    let lAccum = -1;
    let lSepRankAccum = v.sepranks.map(item => { lAccum = lAccum + item; return lAccum; });
    let i = 0;
    for (let lInputKey in v.inputs) {
        lInputArray.push(v.inputs[lInputKey]);
        if (lSepRankAccum.indexOf(i) !== -1) {
            lInputArray.push(new CustomizeInput());
        }
        i++;
    }
    lCustomTabs.push(<CustomizeTab key={v.id} id={v.id} inputs={lInputArray} />)
}

ReactDOM.render(
    <div>
        <h3>Sample Poses</h3>
        <dl className='clearfix'>
            <PoseButtons category="Body:" id="poses" resetPoses={true} poses={lPoses.body} />
            <PoseButtons category="Hand:" id="hand_poses" resetPoses={false} poses={lPoses.hand} />
            <PoseButtons category="Face:" id="face_poses" resetPoses={false} poses={lPoses.face} />
        </dl>
        <h3>Customize pose:</h3>
        <ul id="customize" className="inline">
            <CustomizeButtons buttons={lCustomButtons} />
        </ul>
        <div>
            {lCustomTabs}
        </div>

    </div>,
    document.getElementById("example")
);