export function ipToNumber(ip: string): number {
    return ip.split('.').reduce((acc: number, octet: string) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

export function numberToIp(num: number): string {
    return [
        // first 8
        (num >>> 24) & 255,
        // next 8
        (num >>> 16) & 255,
        // last 8 (least sig. byte)
        (num >>> 8) & 255,
        num & 255
    ].join('.');
}
