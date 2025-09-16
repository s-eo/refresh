import React, {ReactNode} from 'react';

import styles from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    width?: 'compact' | 'half-window';
}

export default function Card({ children, width = 'compact' }: CardProps) {
    return (
        <div className={clsx(styles.card, styles[width])}>
            {children}
        </div>
    );
}