import React from 'react';
import Header from '../header';
import styles from './styles.css';

export default class Layout extends React.Component {
    render () {
        return (
            <div className={styles.hypex}>
            <Header />
            {this.props.children}
            </div>
        );
    }
}
