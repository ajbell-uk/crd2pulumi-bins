import * as reflect from 'jsii-reflect';
import { ComparisonOptions, Mismatches } from './types';
/**
 * Root object for comparing two assemblies
 *
 * Tracks mismatches and used as a lookup table to convert FQNs -> ComparableType objects
 */
export declare class AssemblyComparison {
    readonly options: ComparisonOptions;
    readonly mismatches: Mismatches;
    private readonly types;
    constructor(options: ComparisonOptions);
    /**
     * Load the types from two assemblies to compare
     *
     * Adds appropriate ComparableType<> instances.
     */
    load(original: reflect.Assembly, updated: reflect.Assembly): void;
    /**
     * Perform the comparison for all loaded types
     */
    compare(): void;
    /**
     * Based on a JSII TypeReference, return all reachable ComparableType<> objects.
     */
    typesIn(ref: reflect.TypeReference): Array<ComparableType<any>>;
    /**
     * All ComparableType<>s
     */
    private get comparableTypes();
    /**
     * Find the matching type in the updated assembly based on all types in the original assembly
     */
    private typePairs;
}
/**
 * Base class for comparable types
 *
 * Manages notions of crawling types for other reference types, and whether
 * they occur in an input/output role, and marking as such on the comparison
 * object.
 */
export declare abstract class ComparableType<T> {
    protected readonly assemblyComparison: AssemblyComparison;
    protected readonly oldType: T;
    protected readonly newType: T;
    private static readonly recursionBreaker;
    private readonly _inputTypeReasons;
    private readonly _outputTypeReasons;
    constructor(assemblyComparison: AssemblyComparison, oldType: T, newType: T);
    /**
     * Does this type occur in an input role?
     */
    get inputType(): boolean;
    /**
     * Does this type occur in an output role?
     */
    get outputType(): boolean;
    /**
     * Mark this type as occurring in an input rule.
     *
     * All types reachable from this type will be marked as input types as well.
     */
    markAsInputType(...reasonFragments: string[]): void;
    /**
     * Mark this type as occurring in an input rule.
     *
     * All types reachable from this type will be marked as input types as well.
     */
    markAsOutputType(...reasonFragments: string[]): void;
    /**
     * Describe why this type is an input type (if it is)
     */
    get inputTypeReason(): string;
    /**
     * Describe why this type is an output type (if it is)
     */
    get outputTypeReason(): string;
    /**
     * Should be overriden in subclasses to mark reachable types as input/output types
     *
     * Should only be implemented by subclasses that contain callables.
     */
    markTypeRoles(): void;
    /**
     * Should be overridden in subclasses to perform the comparison
     *
     * Input/output marking will already have been performed before this is called.
     */
    abstract compare(): void;
    /**
     * Alias for the root object Mismaches object
     */
    protected get mismatches(): Mismatches;
    /**
     * Should be overriden in subclasses to execute the callback on reachable types
     *
     * Should be overriden only for product types (structs).
     */
    protected forEachRoleSharingType(cb: (t: ComparableType<any>, reason: string) => void): void;
}
/**
 * Base class for reference types
 *
 * Contains shared code that applies to both class and interface types.
 */
export declare abstract class ComparableReferenceType<T extends reflect.ReferenceType> extends ComparableType<T> {
    /**
     * Compare members of the reference types
     */
    compare(): void;
    /**
     * Mark type accesses (input/output) of methods and properties
     */
    markTypeRoles(): void;
    /**
     * Validate type signatures on all methods
     */
    protected validateMethods(): void;
    /**
     * Validate type signature changes on the given method
     */
    protected validateMethod(original: reflect.Method, updated: reflect.Method): void;
    /**
     * Validate type signature changes on the given callable (method or initializer)
     */
    protected validateCallable<T extends reflect.Method | reflect.Initializer>(original: T, updated: T): void;
    /**
     * Validate type signature changes on all properties
     */
    protected validateProperties(): void;
    /**
     * Validate type signature changes on the given property
     */
    protected validateProperty(original: reflect.Property, updated: reflect.Property): void;
    /**
     * Whether the current reference type has been marked as subclassable
     */
    private get subclassableType();
}
export declare class ComparableClassType extends ComparableReferenceType<reflect.ClassType> {
    /**
     * Perform the reference type comparison and include class-specific checks
     */
    compare(): void;
    /**
     * Type role marking -- include the initializer
     */
    markTypeRoles(): void;
}
/**
 * Interface type comparison
 *
 * (Actually just plain reference type comparison)
 */
export declare class ComparableInterfaceType extends ComparableReferenceType<reflect.InterfaceType> {
}
/**
 * Struct type comparison
 *
 * Most notably: does no-strengthening/no-weakening checks based on whether
 * structs appear in input/output positions.
 */
export declare class ComparableStructType extends ComparableType<reflect.InterfaceType> {
    compare(): void;
    /**
     * Every type of every property should have the same in/out classification as the outer type
     */
    protected forEachRoleSharingType(cb: (t: ComparableType<any>, reason: string) => void): void;
    /**
     * Check that all properties are still present
     *
     * This is because for all non-structurally typed languages it is not allowed
     * to specify members which aren't actually present in the type.
     */
    private validateNoPropertiesRemoved;
    /**
     * Check that the current type is not weakened
     */
    private validateNotWeakened;
    /**
     * Check that the current type is not strengthened
     */
    private validateNotStrengthened;
    private isStructuralSuperType;
}
/**
 * Comparison for enums
 */
export declare class ComparableEnumType extends ComparableType<reflect.EnumType> {
    /**
     * Perform comparisons on enum members
     */
    compare(): void;
}
//# sourceMappingURL=type-comparison.d.ts.map