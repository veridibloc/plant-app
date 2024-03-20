import crypto from 'crypto';

export function generateNumberFromString(input: string, maxNumber: number): number {
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    const integerValue = parseInt(hash.substring(0, 8), 16);
    return integerValue % maxNumber;
}