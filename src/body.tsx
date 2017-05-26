import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/hello";
import { PoseButtons } from "./components/poseButtons";

import { SignPuppetApp } from "./app";

let lSignPuppetApp: SignPuppetApp = new SignPuppetApp();
lSignPuppetApp.create();

let lBodyPoses = [
    { href: "forward", label: "Forward" },
    { href: "out", label: "Out" },
    { href: "down", label: "Down" },
    { href: "in_pose", label: "In" },
    { href: "default_pose", label: "Default" },
];


let lHandPoses = [
    { href: "s", label: "Fist" },
    { href: "5", label: "Five" },
    { href: "A", label: "Thumb" },
    { href: "1", label: "Point" },
    { href: "B", label: "Palm" },
];

let lFacePoses = [
    { href: "wide", label: "Up extreme" },
    { href: "narrow", label: "Down extreme" },
    { href: "teeth", label: "Teeth" },
    { href: "tongue", label: "Tongue" },
    { href: "default_face", label: "Default" },
];

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <h3>Sample Poses</h3>
        <dl className='clearfix'>
            <PoseButtons app={lSignPuppetApp} category="Body:" id="poses" resetPoses={true} poses={lBodyPoses} />
            <PoseButtons app={lSignPuppetApp} category="Hand:" id="hand_poses" resetPoses={false} poses={lHandPoses} />
            <PoseButtons app={lSignPuppetApp} category="Face:" id="face_poses" resetPoses={false} poses={lFacePoses} />
        </dl>
    </div>,
    document.getElementById("example")
);