import * as React from "react";
import { stripSharpFromHref } from "./miscUtils"
import { SignPuppetApp } from "../app"
export class CustomizeInput {
    id: string;
    name?: string;
    label?: string;
    value: number;
    separator: boolean;

    constructor(pID?: string, pValue?: number) {
        if (pID != undefined && pValue != undefined) {
            this.id = pID;
            this.value = pValue;
            this.name = this.id;
            this.label = this.id;
            this.separator = false;
        } else {
            //build separator
            this.id = null;
            this.value = null;
            this.separator = true;
        }
    }
}

export interface CustomizeTabProps {
    
    id: string;
    inputs: Array<CustomizeInput>;
}

export class CustomizeTab extends React.Component<CustomizeTabProps, undefined> {

    componentDidMount() {
        // toggle pose customisation
        let lPoseCustomToggleButtons = document.querySelectorAll('#customize a');
        for (let i = 0; i < lPoseCustomToggleButtons.length; i++) {
            let lPoseCustomToggleButton = lPoseCustomToggleButtons[i];
            lPoseCustomToggleButton.addEventListener("click", function (pEvent) {
                let lFieldSets = document.querySelectorAll('fieldset');
                for (let j = 0; j < lFieldSets.length; j++) {
                    let lFieldSet = lFieldSets[j];
                    lFieldSet.style.display = "none";
                    let lFieldSetId = lFieldSet.getAttribute("id");
                    // strip the #
                    if (lFieldSetId === stripSharpFromHref(lPoseCustomToggleButton.getAttribute("href"))) {
                        lFieldSet.style.display = "block";
                    }
                }

                pEvent.preventDefault();
            }, false);
        }

        let setChannelValue = (pElement: HTMLInputElement, pChannels: Channels) => {
            var v = parseFloat(pElement.value);
            if (!isNaN(v)) {
                const cChannelId = pElement.getAttribute("id");
                pChannels[cChannelId] = v;
            }
        }

        // setup pose customization ui
        let lInputs = document.getElementsByTagName('input');
        for (let i = 0; i < lInputs.length; i++) {
            let lInput = lInputs[i];
            //event
            lInput.addEventListener('change', () => {
                setChannelValue(lInput, SignPuppet.channels);
                document.dispatchEvent(new Event("updateAnimation"));
            }, false)

            //initial
            setChannelValue(lInput, SignPuppet.channels);
        }

    }
    render() {

        let cInputs: Array<JSX.Element> = [];
        let lSepRank=-1;
        this.props.inputs.map(lInput => {
            if (lInput.separator) {
                cInputs.push(<br key={lSepRank.toString()} />);
                lSepRank--;
            } else {
                cInputs.push(<label key={lInput.id}>{lInput.label} <input id={lInput.id} name={lInput.name} defaultValue={lInput.value.toString()} /></label>);
            }
        });
        return <fieldset id={this.props.id}>
            {cInputs}
        </fieldset>;
    }
}