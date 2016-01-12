import React from 'react';
import Container from '../container';
import styles from './styles.css';

export default class Header extends React.Component {
    render() {
        return (
            <header className={styles.header}>
            <Container>
            <a href="/">Hyperiums Tools</a>
            </Container>
            </header>
        );
    }
}
