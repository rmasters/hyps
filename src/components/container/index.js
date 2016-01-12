import React from 'react';
import styles from './styles.css';

export default class Container extends React.Component {
    render() {
        return (
            <div className={styles.container}>
            {this.props.children}
            </div>
        );
    }
}
