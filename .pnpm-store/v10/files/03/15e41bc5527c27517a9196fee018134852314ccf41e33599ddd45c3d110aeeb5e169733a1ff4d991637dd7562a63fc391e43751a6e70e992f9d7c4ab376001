import * as reflect from 'jsii-reflect';
import { IReport } from './types';
/**
 * The updated type is still nominally assignable to all original base types
 *
 * Make sure the following remains compilable:
 *
 * ```
 * BASE instance = new CLASS();
 * ```
 *
 * Where CLASS ≤: BASE.
 */
export declare function validateBaseTypeAssignability<T extends reflect.ReferenceType>(original: T, updated: T, mismatches: IReport): void;
/**
 * The updated type has not been newly made abstract
 *
 * Make sure the following remains compilable:
 *
 * ```
 * new CLASS();
 * ```
 */
export declare function validateNotMadeAbstract(original: reflect.ClassType, updated: reflect.ClassType, mismatches: IReport): void;
/**
 * The updated type has not had its @subclassable attribute removed
 *
 * This would lift a restriction we can't afford.
 */
export declare function validateSubclassableNotRemoved<T extends reflect.ReferenceType>(original: T, updated: T, mismatches: IReport): void;
/**
 * Check that the `static`-ness of a member hasn't changed
 */
export declare function validateStaticSame<T extends reflect.Method | reflect.Property>(original: T, updated: T, mismatches: IReport): void;
/**
 * Check that the `async`-ness of a method hasn't changed
 */
export declare function validateAsyncSame(original: reflect.Method, updated: reflect.Method, mismatches: IReport): void;
/**
 * Once variadic, can never be made non-variadic anymore (because I could always have been passing N+1 arguments)
 */
export declare function validateNotMadeNonVariadic<T extends reflect.Method | reflect.Initializer>(original: T, updated: T, mismatches: IReport): void;
/**
 * Check that no new abstract members were added to a subclassable type
 *
 * You cannot have added abstract members to the class/interface, as they are
 * an added burden on potential implementors.
 */
export declare function validateNoNewAbstractMembers<T extends reflect.ReferenceType>(original: T, updated: T, mismatches: IReport): void;
/**
 * Validate that a method return type is the same or strengthened
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T value = object.method();
 * ```
 *
 * Where RETURN_TYPE(method) ≤: T.
 */
export declare function validateReturnTypeNotWeakened(original: reflect.Method, updated: reflect.Method, mismatches: IReport): void;
/**
 * Validate that a method return type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export declare function validateReturnTypeSame(original: reflect.Method, updated: reflect.Method, mismatches: IReport): void;
/**
 * Validate that a property type is the same or strengthened
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T value = object.prop;
 * ```
 *
 * Where RETURN_TYPE(prop) ≤: T.
 */
export declare function validatePropertyTypeNotWeakened(original: reflect.Property, updated: reflect.Property, mismatches: IReport): void;
/**
 * Validate that a property type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export declare function validatePropertyTypeSame(original: reflect.Property, updated: reflect.Property, mismatches: IReport): void;
/**
 * Validate that a method return type is the same or weakened
 *
 * Make sure the following remains compilable if U is changed:
 *
 * ```
 * function method(arg: U) { ... }
 *
 * object.method(<T>value);
 * ```
 *
 * Where T ≤: U.
 */
export declare function validateParameterTypeWeakened(method: reflect.Method | reflect.Initializer, original: reflect.Parameter, updated: reflect.Parameter, mismatches: IReport): void;
/**
 * Validate that a method parameter type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export declare function validateParameterTypeSame(method: reflect.Method | reflect.Initializer, original: reflect.Parameter, updated: reflect.Parameter, mismatches: IReport): void;
/**
 * Validate that each param in the old callable is still available in the new callable, and apply custom validation to the pairs
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.method(a1, a2, ..., aN);
 * ```
 *
 * (All types still assignable)
 */
export declare function validateExistingParams<T extends reflect.Initializer | reflect.Method>(original: T, updated: T, mismatches: IReport, validateParam: (oldParam: reflect.Parameter, newParam: reflect.Parameter) => void): void;
/**
 * Validate that no new required params got added to the end of the method
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.method(a1, a2, ..., aN);
 * ```
 *
 * (Not too few arguments)
 */
export declare function validateNoNewRequiredParams<T extends reflect.Initializer | reflect.Method>(original: T, updated: T, mismatches: IReport): void;
export declare function validateMethodCompatible<T extends reflect.Method | reflect.Initializer>(original: T, updated: T, mismatches: IReport): void;
/**
 * Check if a class/interface has been marked as @subclassable
 */
export declare function subclassableType(x: reflect.Documentable): boolean;
/**
 * Validate that a previously mutable property is not made immutable
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.prop = value;
 * ```
 */
export declare function validateNotMadeImmutable(original: reflect.Property, updated: reflect.Property, mismatches: IReport): void;
export declare function memberPairs<T extends reflect.TypeMember, U extends reflect.ReferenceType>(origClass: U, xs: T[], updatedClass: U, mismatches: IReport): IterableIterator<[T, reflect.TypeMember]>;
/**
 * Validate that each enum member in the old enum enum, and apply custom validation to the enums
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T x = ENUM.member;
 * ```
 *
 * (For every member of enum)
 */
export declare function validateExistingMembers(original: reflect.EnumType, updated: reflect.EnumType, mismatches: IReport, validateMember: (oldParam: reflect.EnumMember, newParam: reflect.EnumMember) => void): void;
//# sourceMappingURL=validations.d.ts.map