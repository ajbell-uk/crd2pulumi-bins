import * as reflect from 'jsii-reflect';
import { ClassSchema } from '../schema';
import { Transpile } from '../transpile/transpile';
export declare class Class {
    private readonly transpile;
    private readonly klass;
    static isConstruct(klass: reflect.ClassType): boolean;
    private readonly transpiled;
    private readonly initializer?;
    private readonly instanceMethods;
    private readonly staticFunctions;
    private readonly constants;
    private readonly properties;
    private readonly interfaces;
    constructor(transpile: Transpile, klass: reflect.ClassType);
    toJson(): ClassSchema;
}
