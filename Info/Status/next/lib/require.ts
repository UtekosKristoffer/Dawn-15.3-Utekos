export declare function getMaybePagePath(page: string, distDir: string, locales: readonly string[] | undefined, isAppPath: boolean): string | null;
export declare function getPagePath(page: string, distDir: string, locales: string[] | undefined, isAppPath: boolean): string;
export declare function requirePage(page: string, distDir: string, isAppPath: boolean): Promise<any>;

//require-hook
export declare const hookPropertyMap: Map<any, any>;
export declare const defaultOverrides: {
    'styled-jsx': string;
    'styled-jsx/style': string;
    'styled-jsx/style.js': string;
};
export declare function addHookAliases(aliases?: [string, string][]): void;
