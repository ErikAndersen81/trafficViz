export type Scale = {
    ticks: Array<number>
    min:number
    max:number
    interval:number
    range:number
}

export const getScale = (values:Array<number>):Scale => {
    var nTicks:number = 5;
    const stepSizes:Array<number> = [100, 125, 150, 250, 500, 750, 1000];
    const max:number = values.reduce((x,y) => x>y ? x : y);
    const min:number = values.reduce((x,y) => x<y ? x : y);
    const range:number = max - min;
    const digits:number = (`${max}`).length;
    const exactInterval:number = range/nTicks;
    const exactIntervalHead:number =  parseInt((`${exactInterval}`).slice(0,3), 10)
    let stepIndex:number = stepSizes.findIndex(x => x > exactIntervalHead) ;
    let interval:number = stepSizes[stepIndex] * 10**(digits -3);
    interval = interval > range ? interval/10 : interval;
    let a = 1
    while (a * interval < Math.abs(min) ) { a += 1; }   
    const scaleMin:number = min >= 0 ? interval * (a-1) : interval * -a;
    if (scaleMin + interval * (nTicks-1)  < max) {
        stepIndex = stepIndex === 6 ? 1 : stepIndex+1;
        interval = stepSizes[stepIndex] * 10**(digits -3)
        interval = interval > range ? interval/10 : interval;
    }

    const scale = Array(nTicks).fill(0).map((_ , idx) => scaleMin + idx * interval);
    return {
        ticks:scale,
        min:scaleMin,
        max:scale[scale.length-1],
        range:  scale[scale.length-1] - scale[0],
        interval,
    }
}

export const convertScaleToDivergent = (scale:Scale):Scale => {
    let i = 0;
    let divScale:Array<number>;
    if (scale.min < 0 ) {
        while (i * scale.interval + scale.min < 0) i+= 1;
        divScale = Array(2*i + 1).fill(0).map((_, idx) => idx * scale.interval + scale.min)
    }  else {
        while (i * scale.interval - scale.max < 0) i+=1;
        divScale = Array(2*i + 1).fill(0).map((_, idx) => idx * scale.interval - scale.max)
    }
    const ticksDifference = divScale.length - scale.ticks.length;
    if (ticksDifference > 0) divScale = divScale.splice(ticksDifference/2, scale.ticks.length)
    const min = divScale[0]
    const max = divScale[divScale.length-1];
    const range = max-min;
    return {
        min, 
        max, 
        range,
        ticks:divScale,
        interval:scale.interval
    }
}

export const FitToChart = (value:number, chartHeight:number, scale:Scale) => {
    const scalar = chartHeight/scale.range;
    return chartHeight - (value - scale.min) * scalar;
}   