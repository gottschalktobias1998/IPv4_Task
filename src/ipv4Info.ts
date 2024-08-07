import { ipToNumber, numberToIp } from './ipUtils';
import { calculateNumAddresses } from './subnetUtils';
import { calculateMaskFromBlockSize } from './maskUtils';
import { isBroadcastAddress } from './addressUtils';

function ipv4_info(ip: string, subnetMask: string) {
    // Subnetzmaske task
    let prefixLength: number;
    if (subnetMask.includes('.')) {
        // Dot-decimal notation
        prefixLength = subnetMask.split('.').reduce((acc: number, octet: string) =>
            acc + ((parseInt(octet) >>> 0).toString(2).match(/1/g) || []).length, 0);
    } else if (subnetMask.includes('/')) {
        prefixLength = parseInt(subnetMask.split('/')[1]);
    } else {
        throw new Error("Invalid subnet mask format");
    }

    // calc Subnetzadresse
    const ipNumber = ipToNumber(ip);
    const subnetMaskBinary = (0xFFFFFFFF << (32 - prefixLength)) >>> 0;
    const networkAddress = ipNumber & subnetMaskBinary;
    const broadcastAddress = networkAddress | (~subnetMaskBinary >>> 0);

    console.log("Subnetzadresse:", numberToIp(networkAddress));
    console.log("Limited-Broadcast-Adresse:", numberToIp(broadcastAddress));
    console.log("Anzahl der Adressen im Subnetz:", calculateNumAddresses(prefixLength));
}

const blockSize = 50;
const subnetMask = calculateMaskFromBlockSize(blockSize);
console.log(`Berechnete Subnetzmaske für Blockgröße ${blockSize}: ${subnetMask}`);

const ip = "192.168.1.255";
console.log(`Ist ${ip} eine Broadcast-Adresse? ${isBroadcastAddress(ip, subnetMask)}`);

ipv4_info("192.168.1.10", subnetMask);
ipv4_info("192.168.1.10", "/24");
