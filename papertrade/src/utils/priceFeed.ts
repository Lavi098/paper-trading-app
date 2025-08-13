interface Position {
    id: string | number;
    ltp: number;
}

type UpdatePriceFn = (id: string | number, newLtp: number) => void;

export function startMockPriceFeed(
    openPositions: Position[],
    updatePrice: UpdatePriceFn
): void {
    setInterval(() => {
        openPositions.forEach((pos: Position) => {
            // Simulate price change
            const change = (Math.random() - 0.5) * 10;
            const newLtp = Math.max(1, pos.ltp + change);
            updatePrice(pos.id, newLtp);
        });
    }, 1000);
}