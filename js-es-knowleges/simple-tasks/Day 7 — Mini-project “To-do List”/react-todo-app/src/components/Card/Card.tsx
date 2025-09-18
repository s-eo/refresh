import React, {ReactNode} from 'react';

import styles from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    width?: 'initial' | 'column';
}

export default function Card({ children, width = 'initial' }: CardProps) {
    return (
        <div className={clsx(styles.card, styles[width])}>
            {children}
        </div>
    );
}