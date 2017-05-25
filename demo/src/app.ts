
///<reference path="./components/signPuppet.d.ts"/>

var canvas = <HTMLCanvasElement>document.getElementById('the_canvas');
var puppet = SignPuppet.create();
var animator:Animator = puppet.getAnimator();

// animated items
var channels: Channels = {};


// animation
var animFrame = function (cb: FrameRequestCallback) {
    return window.requestAnimationFrame(cb) ||

        setTimeout(cb, 10);

};


function loop(cb: FrameRequestCallback) {
    animFrame(cb);
};

var fps = 15;
var now = 0;
var then = Date.now();
var interval = 1000 / fps;
var delta = 0;

function render() {
    loop(render);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        animator.tween();
        puppet.draw(canvas, canvas.width, canvas.height, 0, 0);

        then = now - (delta % interval);

    }

};
loop(render);

//load pose
function applyPose(pose: { [key: string]: number }) {
    for (var k in pose) {
        if (pose.hasOwnProperty(k)) {
            // send also value to input widgets
            let lInput = <HTMLInputElement>document.getElementById(k);
            if (lInput) {
                lInput.value = pose[k].toString();
            }
            channels[k] = pose[k];
        }
    }
}

function stripSharpFromHref(pString: string) {
    return pString.substr(1);
}

document.addEventListener('DOMContentLoaded', function () {
    // DOM ready, run it!

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

    function setChannelValue(pElement: HTMLInputElement) {
        var v = parseFloat(pElement.value);
        if (!isNaN(v)) {
            const cChannelId = pElement.getAttribute("id");
            channels[cChannelId] = v;
        }
    }

    // setup pose customisation ui
    let lInputs = document.getElementsByTagName('input');
    for (let i = 0; i < lInputs.length; i++) {
        let lInput = lInputs[i];
        //event
        lInput.addEventListener('change', () => {
            setChannelValue(lInput);
            animator.setTarget(channels);
        }, false)

        //initial
        setChannelValue(lInput);
    }

    // apply pose links
    function requestApplyPose(pElement: HTMLElement, pResetPose: boolean) {
        pElement.addEventListener("click", function (e) {
            e.preventDefault();

            if (pResetPose) {
                applyPose(SignPuppet.channels);
                applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
            }
            applyPose(poses[stripSharpFromHref(pElement.getAttribute('href'))]);


            animator.setTarget(channels);
        }, false);
    }

    function requestApplyPoses(pElements: NodeListOf<Element>, pResetPose: boolean) {
        for (let i = 0; i < pElements.length; i++) {
            let lElement = pElements[i];
            requestApplyPose(<HTMLElement>lElement, pResetPose);
        };
    }

    //body pose links
    let lBodyPoseButtons = document.querySelectorAll("#poses a");
    requestApplyPoses(lBodyPoseButtons, true);

    //other pose links
    let lHandPoseButtons = document.querySelectorAll("#hand_poses a");
    requestApplyPoses(lHandPoseButtons, false);

    let lFacePoseButtons = document.querySelectorAll("#face_poses a");
    requestApplyPoses(lFacePoseButtons, false);

}, false);
