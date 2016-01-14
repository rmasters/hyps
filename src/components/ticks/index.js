import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';
import moment from 'moment';
import moment_tz from 'moment-timezone';

let timeToNext = (now, start, interval) => {
    var last = start;

    while (last.isBefore(now)) {
        last.add(interval);
    }

    return last;
};

export default class Ticks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: moment().tz("UTC"),
            ticks: props.data.ticks
        };
    }

    componentDidMount() {
        this.setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({now: moment().tz("UTC")});

        for (var key in this.refs) {
            this.refs[key].tick(this.state.now);
        }
    }

    render() {
        let ticks = this.state.ticks;

        ticks.sort(function(a, b) {
            let attn = timeToNext(this.state.now, a.startTime, a.interval);
            let attb = timeToNext(this.state.now, b.startTime, b.interval);

            if (attn > attb) return 1;
            if (attn < attb) return -1;
            return 0;
        }.bind(this));

        ticks = ticks.map(function(tick, i) {
            return (
                <Tick key={tick.name} startTime={tick.startTime} interval={tick.interval} name={tick.name} ref={'tick' + i} />
            );
        }, this);

        return (
            <div>
            <HyperiumsTime key="hyptime" ref="hyptime" />
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
        return {};
    }

    tick(now) {
        this.setState({now: now});
    }

    getImminencyClass(next) {
        var seconds = next.diff(moment().tz("UTC"), 'seconds');

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
        let next = timeToNext(this.state.now, this.props.startTime, this.props.interval);

        return (
            <div className={classnames(styles.tick, this.getImminencyClass(next))}>
            {this.props.name}: {next.fromNow()}
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
        return {now: moment().tz("UTC")};
    }

    render() {
        var time = this.state.now.format("YYYY-MM-DD HH:mm:ss");
        return (
            <div className={classnames(styles.tick, styles.hyperiums_time)}>
                {time}
            </div>
        );
    }
}
