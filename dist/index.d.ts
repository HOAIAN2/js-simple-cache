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
    set(item: Object, expiryTime?: number): void;
    get(key: string | number | bigint): Object;
    remove(key: string | number | bigint): void;
    clear(): void;
    findKey(callback: Function): any;
    filter(callback: Function): any[];
    toObject(): any;
    toArray(): Object[];
    toJSONArray(): string;
    toJSONObject(): string;
    search(options: SearchOptions): Object[];
}
export {};
