import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';
import moment from 'moment';
import moment_tz from 'moment-timezone';

let timeToNext = (start, interval) => {
    var now = moment().tz("UTC");
    var last = start;

    while (last.isBefore(now)) {
        last.add(interval);
    }

    return last;
};

let RenderTimeLeft = (time) => {
    return time.fromNow();
};

export default class Ticks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {now: moment().tz("UTC")};
    }

    componentDidMount() {
        // disable this until we can get the re-render to trickle down to ticks
        // they shouldn't be re-created every tick!
        //this.setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({now: moment().tz("UTC")});
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
        this.state = this.getTickState();
    }

    getTickState() {
        return {nextOccurrence: this.timeToNext()};
    }

    componentDidMount() {
        this.tick();
        this.setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({nextOccurrence: this.timeToNext()});
    }

    timeToNext() {
        let next = timeToNext(this.props.startTime, this.props.interval);
        // Less while loops next time
        //this.props.startTime = next.subtract(this.props.interval);
        return next;
    }

    getImminencyClass() {
        var seconds = this.state.nextOccurrence.diff(moment().tz("UTC"), 'seconds');

        if (seconds <= 5 * 60) {
            return styles.imminent;
        }

        if (seconds <= 15 * 60) {
            return styles.soon;
        }

        if (seconds <= 30 * 60) {
            return styles.later;
        }
    }

    render() {
        return (
            <div className={classnames(styles.tick, this.getImminencyClass())}>
            {this.props.name}: {RenderTimeLeft(this.state.nextOccurrence)}
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
    getTickState() {
        return {time: moment().tz("UTC")};
    }

    tick() {
        this.setState({time: moment().tz("UTC")});
    }

    render() {
        var time = this.state.time.format("YYYY-MM-DD HH:mm:ss");
        return (
            <div className={classnames(styles.tick, styles.hyperiums_time)}>
                {time}
            </div>
        );
    }
}
