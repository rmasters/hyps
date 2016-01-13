import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';
import moment from 'moment';

let timeToNext = (start, interval) => {
    var now = new Date();
    var seconds = [
        now.getHours() * 3600,
        now.getMinutes() * 60,
        now.getSeconds()
    ].reduce(function(pv, cv) { return pv + cv; })

    var last = start;
    while (last + interval < seconds) {
        last += interval;
    }

    return (last + interval) - seconds;
};

let TimeLeft = (seconds) => {
    var time = {
        h: 0,
        m: 0,
        s: 0
    };

    if (seconds > 3600) {
        time.h = Math.floor(seconds / 3600);
        seconds -= time.h * 3600;
    }

    if (seconds > 60) {
        time.m = Math.floor(seconds / 60);
        seconds -= time.m * 60;
    }

    time.s = seconds;

    return time;
};

let RenderTimeLeft = (time) => {
    var output = [];
    if (time.h > 0) {
        output.push(time.h + "h");
    }
    if (time.h > 0 || time.m > 0) {
        output.push(time.m + "m");
    }
    if (time.h > 0 || time.m > 0 || time.s > 0) {
        output.push(time.s + "s");
    }
    if (time.h + time.m + time.s <= 0) {
        output.push("Now");
    }

    return output.join(" ");
};

export default class Ticks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: new Date()
        };
    }

    componentDidMount() {
        this.setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({now: new Date()});
    }

    render() {
        let ticks = this.props.data.ticks;

        ticks.sort(function(a, b) {
            let attn = timeToNext(a.startTime, a.interval);
            let attb = timeToNext(b.startTime, b.interval);

            if (attn > attb) return 1;
            if (attn < attb) return -1;
            return 0;
        });
        
        ticks = ticks.map(function(tick) {
            return (
                <Tick key={tick.name} startTime={tick.startTime} interval={tick.interval} name={tick.name} />
            );
        });

        return (
            <div>
            <HyperiumsTime key="hyptime" />
            {ticks}
            </div>
        );
    }

    componentWillMount() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals = [];
    }

    setInterval() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals.push(setInterval.apply(null, arguments));
    }

    componentWillUnmount() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals.map(clearInterval);
    }
}

class Tick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.tick();
        this.setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({
            secondsRemaining: this.timeToNext()
        });
    }

    timeToNext() {
        return timeToNext(this.props.startTime, this.props.interval);
    }

    getImminencyClass() {
        if (this.state.secondsRemaining <= 5 * 60) {
            return styles.imminent;
        }

        if (this.state.secondsRemaining <= 15 * 60) {
            return styles.soon;
        }

        if (this.state.secondsRemaining <= 30 * 60) {
            return styles.later;
        }
    }

    render() {
        return (
            <div className={classnames(styles.tick, this.getImminencyClass())}>
            {this.props.name}: {RenderTimeLeft(TimeLeft(this.state.secondsRemaining))}
            </div>
        );
    }

    componentWillMount() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals = [];
    }

    setInterval() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals.push(setInterval.apply(null, arguments));
    }

    componentWillUnmount() {
        // @todo remove when mixins are supported in es6/react?
        this.intervals.map(clearInterval);
    }
}

class HyperiumsTime extends Tick
{
    tick() {
        this.setState({time: new Date()});
    }

    render() {
        var time = moment(this.state.time).format("YYYY-MM-DD HH:mm:ss");
        return (
            <div className={classnames(styles.tick, styles.hyperiums_time)}>
                {time}
            </div>
        );
    }
}
