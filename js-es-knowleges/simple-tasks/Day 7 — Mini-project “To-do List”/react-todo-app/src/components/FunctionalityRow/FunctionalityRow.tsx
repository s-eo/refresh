import React from "react";

import styles from './FunctionalityRow.module.css';
import clsx from "clsx";

interface FunctionalityRowProps {
    children?: React.ReactNode;
    className?: string;
    alignTop?: boolean;
}

export default function FunctionalityRow({ children, className, alignTop = false }: FunctionalityRowProps) {
    return (
      <div className={clsx(styles.container, className, { [styles.top]: alignTop })}>{children}</div>
    );
}