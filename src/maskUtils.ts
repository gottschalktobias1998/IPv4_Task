export function calculateMaskFromBlockSize(blockSize: number): string {
    if (blockSize < 2) {
        throw new Error("Block size must be at least 2.");
    }
    const numAddresses = blockSize + 2;
    // Finde die nächstgrößere Potenz von 2
    const prefixLength = 32 - Math.ceil(Math.log2(numAddresses));

    // Berechne die Subnetzmaske // making sure all bits are set.
    const subnetMask = (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
    return [
        (subnetMask >>> 24) & 255,
        (subnetMask >>> 16) & 255,
        (subnetMask >>> 8) & 255,
        subnetMask & 255
    ].join('.');
}


// Hexadecimal Representation:

// 0x denotes that the following number is in hexadecimal format.
// FFFFFFFF is the hexadecimal equivalent of the binary number 11111111111111111111111111111111.
// Binary Representation:

// 0xFFFFFFFF in binary is 11111111111111111111111111111111.
// It represents a 32-bit number where all bits are set to 1.
// Decimal Representation:

// The decimal equivalent of 0xFFFFFFFF is 4294967295.

// For blockSize = 256, numAddresses would be 258.
// Math.log2(258) is approximately 8.015.
// Math.ceil(8.015) is 9, so prefixLength is 32 - 9 = 23.
// 0xFFFFFFFF << 9 results in 0xFFFFFE00.
// The subnet mask 0xFFFFFE00 in dotted decimal is 255.255.254.0.
