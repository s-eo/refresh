import React from 'react';

import styles from "./Loading.module.css";

interface Props {
    size?: number; // in px
}

export default function Loading({ size = 160 }: Props) {
    const segments: Array<undefined | HTMLDivElement> = Array.from({ length: 12 });

    return (

        <div className={styles.stage} role="status" aria-label="Loading">
            <div className={styles.spinner}>
                {segments.map((_, i) => (
                    <div
                        key={i}
                        className={styles.segment}
                        style={{["--i"]: i} as React.CSSProperties}
                    />
                ))}
            </div>
        </div>
    );
}
