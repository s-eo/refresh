import React from 'react';

import Card from "../Card/Card";

interface Props {
    children?: React.ReactNode;
}

export default function Loading({ children }: Props) {
    return (
        <Card>
            <h2>🌀 Loading...</h2>
            {children}
        </Card>
    );
}
