import * as React from "react";
import { stripSharpFromHref } from "./miscUtils"
///<reference path="./components/signpuppet/signPuppet.d.ts"/>

import { SignPuppetApp } from "../app"
import { poses } from "../poses";

export interface PoseButton {
    href: string;
    label: string;
}

export interface PoseButtonsProps {
    
    category: string;
    id: string;
    poses: Array<PoseButton>;
    resetPoses: boolean;
}

export class PoseButtons extends React.Component<PoseButtonsProps, undefined> {

    //load pose
    applyPose = (pPose:  Channels) => {
        for (var k in pPose) {
            if (pPose.hasOwnProperty(k)) {
                // send also value to input widgets
                let lInput = document.getElementById(k) as HTMLInputElement;
                if (lInput) {
                    lInput.value = pPose[k].toString();
                }
                SignPuppet.channels[k] = pPose[k];
            }
        }
    }

    // apply pose links
    requestApplyPose = (pElement: HTMLElement,  pResetPose: boolean) => {
        pElement.addEventListener("click", e => {
            e.preventDefault();

            if (pResetPose) {
                this.applyPose(SignPuppet.channels);
                this.applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
            }
            this.applyPose(poses[stripSharpFromHref(pElement.getAttribute('href'))]);


            document.dispatchEvent(new Event("updateAnimation"));
        }, false);
    }

    requestApplyPoses = (pElements: NodeListOf<Element>, pResetPose: boolean) => {
        for (let i = 0; i < pElements.length; i++) {
            let lElement = pElements[i];
            this.requestApplyPose(lElement as HTMLElement,  pResetPose);
        };
    }


    componentDidMount() {

        // pose links
        let lPoseButtons = document.querySelectorAll("#" + this.props.id + " a");
        this.requestApplyPoses(lPoseButtons, this.props.resetPoses);

    }

    render() {

      
        return (
            <div>
                <dt>{this.props.category}</dt>
                <dd>
                    <ul id={this.props.id} className="inline">
                        {this.props.poses.map(lPose => <li key={lPose.label}><a href={"#" + lPose.href}>{lPose.label}</a></li>)}
                    </ul>
                </dd>
            </div>

        );
    }
}