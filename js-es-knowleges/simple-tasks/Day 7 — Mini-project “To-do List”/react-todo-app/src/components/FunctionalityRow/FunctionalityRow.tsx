import React from "react";

import styles from './FunctionalityRow.module.css';
import clsx from "clsx";

interface FunctionalityRowProps {
    children?: React.ReactNode;
    className?: string;
}

export default function FunctionalityRow({ children, className}: FunctionalityRowProps) {
    return (
      <div className={clsx(className, styles.container)}>{children}</div>
    );
}