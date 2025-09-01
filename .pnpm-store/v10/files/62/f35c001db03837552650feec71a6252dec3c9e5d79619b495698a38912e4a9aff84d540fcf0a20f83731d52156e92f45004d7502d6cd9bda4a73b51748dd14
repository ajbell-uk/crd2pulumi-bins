import * as reflect from 'jsii-reflect';
import { ApiReferenceSchema } from '../schema';
import { Transpile } from '../transpile/transpile';
/**
 * Render an API reference based on the jsii assembly.
 */
export declare class ApiReference {
    private readonly constructs;
    private readonly structs;
    private readonly interfaces;
    private readonly classes;
    private readonly enums;
    constructor(transpile: Transpile, assembly: reflect.Assembly, submodule?: reflect.Submodule, allSubmodules?: boolean);
    /**
     * Generate JSON.
     */
    toJson(): ApiReferenceSchema;
    private sortByName;
}
