export function calculateNumAddresses(prefixLength: number): number {
    return 2 ** (32 - prefixLength) - 2;
}
