import React from 'react';
import Layout from '../layout';
import Ticks from '../ticks';
import ticks from '../../ticks';

export default class Root extends React.Component {
    render() {
        return (
            <Layout>
            <Ticks data={ticks} />
            </Layout>
        );
    }
}
