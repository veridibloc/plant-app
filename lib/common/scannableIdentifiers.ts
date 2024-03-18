

interface CtorArgs {
    type: "va" | "vb"
    parts: string[]
}
export class ScannableIdentifier {
    private _type: "va" | "vb";
    private _parts: string[];

    constructor({type, parts} : CtorArgs) {
        this._type = type;
        this._parts = parts;
    }

    get type() {
        return this._type;
    }

    get parts() {
        return this._parts;
    }

    get accountId() {
        return this.type === "va"? this._parts[0] : "";
    }

    get stockContractId() {
        return this.type === "vb"? this._parts[0] : "";
    }

    get lotId() {
        return this.type === "vb"? this._parts[1] : "";
    }

    private static isValidNumericId(value: string) {
        return /^\d{10,24}$/.test(value);
    }

    static parse(identifier: string): ScannableIdentifier {
        const parts = identifier.split('.');

        if(!parts.length) {
            throw new Error('Invalid identifier format');
        }

        const type = parts.shift();
        if (type === 'va' &&
            parts.length === 1 &&
            ScannableIdentifier.isValidNumericId(parts[0])) {
            return new ScannableIdentifier({
                type,
                parts
            })
        }

        if (type === 'vb' &&
            parts.length === 2 &&
            ScannableIdentifier.isValidNumericId(parts[0]) &&
            ScannableIdentifier.isValidNumericId(parts[1])) {
            return new ScannableIdentifier({
                type,
                parts
            })
        }

        throw new Error(`Invalid identifier format: ${identifier}`);
    }

    isAccountIdentifier(): boolean {
        return this._type === 'va';
    }

    isLotIdentifier(): boolean {
        return this._type === 'vb';
    }

    toString(): string {
        return `${this._type}.${this._parts.join('.')}`;
    }
}