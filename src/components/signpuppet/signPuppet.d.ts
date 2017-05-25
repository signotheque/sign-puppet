declare type Channels = { [key: string]: number };

declare interface Animator {
    tween():void;
    setTarget(channels: Channels):void;
}


declare namespace SignPuppet {
    
    let channels: Channels;
    function create(): any;
    function draw(canvas: HTMLCanvasElement,
        w: number, h: number, x: number, y: number,
        channels: Channels): void;
    function getAnimator(): Animator;
}