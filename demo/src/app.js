var canvas = document.getElementById('the_canvas');
var puppet = aslfont.SignPuppet.create();
var animator = puppet.getAnimator();

// animated items
var channels = {};


// animation
var animFrame = (function () {
    return window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (cb, el) {
            setTimeout(cb, 10);
        };
}());

var loop, render;
loop = function () {
    animFrame(render, canvas);
};
render = function () {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    animator.tween();
    puppet.draw(canvas, canvas.width, canvas.height, 0, 0);
    setTimeout(loop, 50);
};
setTimeout(loop, 50);

//load pose
function applyPose(pose) {
    for (var k in pose) {
        if (pose.hasOwnProperty(k)) {
            $('#' + k).val(pose[k]);
            channels[k] = pose[k];
        }
    }
}

function stripSharpFromHref(pString) {
    return pString.substr(1);
}

//$(document).ready(function () {
document.addEventListener('DOMContentLoaded', function () {
    // DOM ready, run it!

    // toggle pose customisation
    let lPoseCustomToggleButtons = document.querySelectorAll('#customize a');
    for (let lPoseCustomToggleButton of lPoseCustomToggleButtons) {
        lPoseCustomToggleButton.addEventListener("click", function (pEvent) {
            let lFieldSets = document.querySelectorAll('fieldset');
            for (let lFieldSet of lFieldSets) {
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
    // $('#customize a').each(function () {
    //     $(this).click(function (e) {
    //         $('fieldset').hide();
    //         $($(this).attr('href')).show();
    //         e.preventDefault();
    //     });
    // });

    function setChannelValue(pElement) {
        var v = parseFloat(pElement.value);
        if (!isNaN(v)) {
            const cChannelId = pElement.getAttribute("id");
            channels[cChannelId] = v;
        }
    }

    // setup pose customisation ui
    let lInputs = document.getElementsByTagName('input');
    for (let lInput of lInputs) {

        //event
        lInput.addEventListener('change', () => {
            setChannelValue(lInput);
            animator.setTarget(channels);
        }, false)

        //initial
        setChannelValue(lInput);
    }

    // $('input').each(function () {

    //     //event
    //     $(this).change(function () {
    //         var v = parseFloat($(this).val());
    //         if (!isNaN(v)) {
    //             channels[$(this).attr('id')] = v;
    //         }
    //         animator.setTarget(channels);
    //     });

    //     //initial
    //     var v = parseFloat($(this).val());
    //     if (!isNaN(v)) {
    //         channels[$(this).attr('id')] = v;
    //     }
    // });

    // apply pose links

    function requestApplyPose(pElement, pResetPose) {
        pElement.addEventListener("click", function (e) {
            e.preventDefault();

            if (pResetPose) {
                applyPose(aslfont.SignPuppet.channels);
                applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
            }
            applyPose(poses[stripSharpFromHref(pElement.getAttribute('href'))]);


            animator.setTarget(channels);
        }, false);
    }

    function requestApplyPoses(pElements, pResetPose) {
        for (lElement of pElements) {
            requestApplyPose(lElement, pResetPose);
        };
    }

    //body pose links
    let lBodyPoseButtons = document.querySelectorAll("#poses a");
    requestApplyPoses(lBodyPoseButtons,true);
    
    // $('#poses a').each(function () {
    //     $(this).click(function (e) {
    //         e.preventDefault();
    //         applyPose(aslfont.SignPuppet.channels);
    //         applyPose(poses[$(this).attr('href').substring(1)]);
    //         applyPose({ rt0x: -1, rt1x: -1, lt0x: -1, lt1x: -1 });
    //         animator.setTarget(channels);
    //     });
    // });



    //other pose links
    let lHandPoseButtons = document.querySelectorAll("#hand_poses a");
    requestApplyPoses(lHandPoseButtons,false);

    let lFacePoseButtons = document.querySelectorAll("#face_poses a");
    requestApplyPoses(lFacePoseButtons,false);

    // $('#hand_poses a, #face_poses a').each(function () {
    //     $(this).click(function (e) {
    //         e.preventDefault();
    //         applyPose(poses[$(this).attr('href').substring(1)]);
    //         animator.setTarget(channels);
    //     });
    // });

}, false);
