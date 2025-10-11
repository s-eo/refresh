import React, {ComponentProps, ReactNode} from 'react';

import styles from "./Card.module.css";
import clsx from "clsx";

interface CardProps extends ComponentProps<any>{
    children: ReactNode;
    visible?: boolean;
}

export default function Card({ children, visible = false, className, ...rest }: CardProps) {
    return (
        <div className={clsx(styles.card, visible && styles.visible, className)} {...rest}>
            {children}
        </div>
    );
}