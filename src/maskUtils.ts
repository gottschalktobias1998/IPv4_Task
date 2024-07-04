export function calculateMaskFromBlockSize(blockSize: number): string {
    if (blockSize < 2) {
        throw new Error("Block size must be at least 2.");
    }

    // Finde die nächstgrößere Potenz von 2
    const numAddresses = blockSize + 2;
    const prefixLength = 32 - Math.ceil(Math.log2(numAddresses));

    // Berechne die Subnetzmaske
    const subnetMask = (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
    return [
        (subnetMask >>> 24) & 255,
        (subnetMask >>> 16) & 255,
        (subnetMask >>> 8) & 255,
        subnetMask & 255
    ].join('.');
}
