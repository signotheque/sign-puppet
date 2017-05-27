
///<reference path="./components/signpuppet/signPuppet.d.ts"/>

import { poses } from "./poses";
import { stripSharpFromHref } from "./components/miscUtils"

export class SignPuppetApp {

    private mPuppet: any;
    
    get animator(): Animator {
        return this.mPuppet.getAnimator();
    }

    create() {
        this.mPuppet = SignPuppet.create();

        
        // animated items
        // this.mChannels = SignPuppet.channels;

    }

    bind(pCanvasID: string) {
        var canvas = <HTMLCanvasElement>document.getElementById(pCanvasID);
        if (!canvas) {
            console.error("no canvas found!");
            return;
        }

        this.mPuppet.getAnimator().setTarget(SignPuppet.channels);
        
        document.addEventListener("updateAnimation", (pEvent:Event) => {
            this.mPuppet.getAnimator().setTarget(SignPuppet.channels);
        }, false);

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

        let render = () => {
            loop(render);

            now = Date.now();
            delta = now - then;

            if (delta > interval) {

                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                this.mPuppet.getAnimator().tween();
                this.mPuppet.draw(canvas, canvas.width, canvas.height, 0, 0);

                then = now - (delta % interval);

            }

        };
        loop(render);

    }
}