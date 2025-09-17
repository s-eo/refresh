import React from "react";

import styles from './FunctionalityRow.module.css';

interface FunctionalityRowProps {
    children?: React.ReactNode;
}

export default function FunctionalityRow({ children}: FunctionalityRowProps) {
    return (
      <div className={styles.container}>{children}</div>
    );
}