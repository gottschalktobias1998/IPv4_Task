import { ipToNumber, numberToIp } from './ipUtils';

export function isBroadcastAddress(ip: string, subnetMask: string): boolean {
    // Subnetzmaske task
    let prefixLength: number;
    if (subnetMask.includes('.')) {
        // Dot-decimal notation
        prefixLength = subnetMask.split('.').reduce((acc: number, octet: string) =>
            acc + ((parseInt(octet) >>> 0).toString(2).match(/1/g) || []).length, 0);
    } else if (subnetMask.includes('/')) {
        // CIDR notation
        prefixLength = parseInt(subnetMask.split('/')[1]);
    } else {
        throw new Error("Invalid subnet mask format");
    }

    const ipNumber = ipToNumber(ip);
    const subnetMaskBinary = (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
    const networkAddress = ipNumber & subnetMaskBinary;
    const broadcastAddress = networkAddress | (~subnetMaskBinary >>> 0);

    return ipNumber === broadcastAddress;
}
 