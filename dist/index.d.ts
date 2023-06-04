interface SearchOptions {
    searchValue: string;
    searchFields: string[];
    nocase?: boolean;
    deepScan?: boolean;
}
export declare class Cache {
    #private;
    constructor(key: string, limit?: number);
    get key(): string;
    get size(): number;
    get limit(): number;
    set limit(value: number);
    set(item: object, expiryTime?: number): void;
    get(key: string | number | bigint): object | undefined;
    has(key: string | number | bigint): boolean;
    remove(key: string | number | bigint): void;
    clear(): void;
    findKey(callback: Function): string | number | bigint | undefined;
    filter(callback: Function): object[];
    toObject(): object;
    toArray(): object[];
    toJSONArray(): string;
    toJSONObject(): string;
    search(options: SearchOptions): object[];
}
export {};
