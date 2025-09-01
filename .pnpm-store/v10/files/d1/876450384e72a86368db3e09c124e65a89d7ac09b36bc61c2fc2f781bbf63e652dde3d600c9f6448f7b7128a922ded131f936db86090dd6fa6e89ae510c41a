"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableEnumType = exports.ComparableStructType = exports.ComparableInterfaceType = exports.ComparableClassType = exports.ComparableReferenceType = exports.ComparableType = exports.AssemblyComparison = void 0;
const spec_1 = require("@jsii/spec");
const reflect = require("jsii-reflect");
const log4js = require("log4js");
const stability_1 = require("./stability");
const type_analysis_1 = require("./type-analysis");
const types_1 = require("./types");
const util_1 = require("./util");
const validations_1 = require("./validations");
const LOG = log4js.getLogger('jsii-diff');
/**
 * Root object for comparing two assemblies
 *
 * Tracks mismatches and used as a lookup table to convert FQNs -> ComparableType objects
 */
class AssemblyComparison {
    constructor(options) {
        this.options = options;
        this.types = new Map();
        this.mismatches = new types_1.Mismatches({
            defaultStability: options.defaultExperimental
                ? spec_1.Stability.Experimental
                : spec_1.Stability.Stable,
        });
    }
    /**
     * Load the types from two assemblies to compare
     *
     * Adds appropriate ComparableType<> instances.
     */
    load(original, updated) {
        /* eslint-disable prettier/prettier */
        for (const [origClass, updatedClass] of this.typePairs(original.allClasses, updated)) {
            this.types.set(origClass.fqn, new ComparableClassType(this, origClass, updatedClass));
        }
        for (const [origIface, updatedIface] of this.typePairs(original.allInterfaces, updated)) {
            if (origIface.datatype !== updatedIface.datatype) {
                this.mismatches.report({
                    ruleKey: 'iface-type',
                    violator: origIface,
                    message: `used to be a ${(0, types_1.describeInterfaceType)(origIface.datatype)}, is now a ${(0, types_1.describeInterfaceType)(updatedIface.datatype)}.`,
                });
                continue;
            }
            this.types.set(origIface.fqn, origIface.datatype
                ? new ComparableStructType(this, origIface, updatedIface)
                : new ComparableInterfaceType(this, origIface, updatedIface));
        }
        for (const [origEnum, updatedEnum] of this.typePairs(original.allEnums, updated)) {
            this.types.set(origEnum.fqn, new ComparableEnumType(this, origEnum, updatedEnum));
        }
        /* eslint-enable prettier/prettier */
    }
    /**
     * Perform the comparison for all loaded types
     */
    compare() {
        LOG.debug(`Comparing ${this.comparableTypes.length} types`);
        this.comparableTypes.forEach((t) => t.markTypeRoles());
        this.comparableTypes.forEach((t) => t.compare());
    }
    /**
     * Based on a JSII TypeReference, return all reachable ComparableType<> objects.
     */
    typesIn(ref) {
        const ret = new Array();
        for (const fqn of fqnsFrom(ref)) {
            const t = this.types.get(fqn);
            if (t) {
                ret.push(t);
            }
        }
        return ret;
    }
    /**
     * All ComparableType<>s
     */
    get comparableTypes() {
        return Array.from(this.types.values());
    }
    /**
     * Find the matching type in the updated assembly based on all types in the original assembly
     */
    *typePairs(xs, updatedAssembly) {
        for (const origType of xs) {
            LOG.trace(origType.fqn);
            const updatedType = updatedAssembly.tryFindType(origType.fqn);
            if (!updatedType) {
                this.mismatches.report({
                    ruleKey: 'removed',
                    violator: origType,
                    message: 'has been removed',
                });
                continue;
            }
            if ((0, types_1.describeType)(origType) !== (0, types_1.describeType)(updatedType)) {
                this.mismatches.report({
                    ruleKey: 'struct-change',
                    violator: origType,
                    message: `has been turned into a ${(0, types_1.describeType)(updatedType)}`,
                });
                continue;
            }
            yield [origType, updatedType]; // Trust me I know what I'm doing
        }
    }
}
exports.AssemblyComparison = AssemblyComparison;
/**
 * Base class for comparable types
 *
 * Manages notions of crawling types for other reference types, and whether
 * they occur in an input/output role, and marking as such on the comparison
 * object.
 */
class ComparableType {
    constructor(assemblyComparison, oldType, newType) {
        this.assemblyComparison = assemblyComparison;
        this.oldType = oldType;
        this.newType = newType;
        this._inputTypeReasons = new Array();
        this._outputTypeReasons = new Array();
    }
    /**
     * Does this type occur in an input role?
     */
    get inputType() {
        return this._inputTypeReasons.length > 0;
    }
    /**
     * Does this type occur in an output role?
     */
    get outputType() {
        return this._outputTypeReasons.length > 0;
    }
    /**
     * Mark this type as occurring in an input rule.
     *
     * All types reachable from this type will be marked as input types as well.
     */
    markAsInputType(...reasonFragments) {
        ComparableType.recursionBreaker.do(this, () => {
            this._inputTypeReasons.push(reasonFragments.join(', '));
            this.forEachRoleSharingType((type, reason) => {
                type.markAsInputType(reason, ...reasonFragments);
            });
        });
    }
    /**
     * Mark this type as occurring in an input rule.
     *
     * All types reachable from this type will be marked as input types as well.
     */
    markAsOutputType(...reasonFragments) {
        ComparableType.recursionBreaker.do(this, () => {
            this._outputTypeReasons.push(reasonFragments.join(', '));
            this.forEachRoleSharingType((type, reason) => {
                type.markAsOutputType(reason, ...reasonFragments);
            });
        });
    }
    /**
     * Describe why this type is an input type (if it is)
     */
    get inputTypeReason() {
        return describeReasons(this._inputTypeReasons);
    }
    /**
     * Describe why this type is an output type (if it is)
     */
    get outputTypeReason() {
        return describeReasons(this._outputTypeReasons);
    }
    /**
     * Should be overriden in subclasses to mark reachable types as input/output types
     *
     * Should only be implemented by subclasses that contain callables.
     */
    markTypeRoles() {
        // Empty on purpose
    }
    /**
     * Alias for the root object Mismaches object
     */
    get mismatches() {
        return this.assemblyComparison.mismatches;
    }
    /**
     * Should be overriden in subclasses to execute the callback on reachable types
     *
     * Should be overriden only for product types (structs).
     */
    forEachRoleSharingType(cb) {
        Array.isArray(cb);
    }
}
exports.ComparableType = ComparableType;
ComparableType.recursionBreaker = new util_1.RecursionBreaker();
/**
 * Base class for reference types
 *
 * Contains shared code that applies to both class and interface types.
 */
class ComparableReferenceType extends ComparableType {
    /**
     * Compare members of the reference types
     */
    compare() {
        LOG.debug(`Reference type ${this.oldType.fqn}`);
        (0, stability_1.validateStabilities)(this.oldType, this.newType, this.mismatches);
        (0, validations_1.validateBaseTypeAssignability)(this.oldType, this.newType, this.mismatches);
        (0, validations_1.validateSubclassableNotRemoved)(this.oldType, this.newType, this.mismatches);
        if (this.subclassableType) {
            (0, validations_1.validateNoNewAbstractMembers)(this.oldType, this.newType, this.mismatches);
        }
        this.validateMethods();
        this.validateProperties();
    }
    /**
     * Mark type accesses (input/output) of methods and properties
     */
    markTypeRoles() {
        for (const method of this.oldType.ownMethods) {
            determineTypeRolesFromMethod(this.assemblyComparison, method);
        }
        for (const property of this.oldType.ownProperties) {
            determineTypeRolesFromProperty(this.assemblyComparison, property);
        }
    }
    /**
     * Validate type signatures on all methods
     */
    validateMethods() {
        for (const [orig, updated] of (0, validations_1.memberPairs)(this.oldType, this.oldType.allMethods, this.newType, this.mismatches)) {
            if (reflect.isMethod(updated)) {
                this.validateMethod(orig, updated);
            }
        }
    }
    /**
     * Validate type signature changes on the given method
     */
    validateMethod(original, updated) {
        (0, validations_1.validateStaticSame)(original, updated, this.mismatches);
        (0, validations_1.validateAsyncSame)(original, updated, this.mismatches);
        if (this.subclassableType) {
            (0, validations_1.validateReturnTypeSame)(original, updated, this.mismatches.withMotivation('type is @subclassable'));
        }
        else {
            (0, validations_1.validateReturnTypeNotWeakened)(original, updated, this.mismatches);
        }
        this.validateCallable(original, updated);
    }
    /**
     * Validate type signature changes on the given callable (method or initializer)
     */
    validateCallable(original, updated) {
        (0, stability_1.validateStabilities)(original, updated, this.mismatches);
        (0, validations_1.validateNotMadeNonVariadic)(original, updated, this.mismatches);
        // Check that every original parameter can still be mapped to a parameter in the updated method
        (0, validations_1.validateExistingParams)(original, updated, this.mismatches, (oldParam, newParam) => {
            if (this.subclassableType) {
                (0, validations_1.validateParameterTypeSame)(original, oldParam, newParam, this.mismatches.withMotivation('type is @subclassable'));
            }
            else {
                (0, validations_1.validateParameterTypeWeakened)(original, oldParam, newParam, this.mismatches);
            }
        });
        (0, validations_1.validateNoNewRequiredParams)(original, updated, this.mismatches);
    }
    /**
     * Validate type signature changes on all properties
     */
    validateProperties() {
        for (const [orig, updated] of (0, validations_1.memberPairs)(this.oldType, this.oldType.allProperties, this.newType, this.mismatches)) {
            if (reflect.isProperty(updated)) {
                this.validateProperty(orig, updated);
            }
        }
    }
    /**
     * Validate type signature changes on the given property
     */
    validateProperty(original, updated) {
        (0, stability_1.validateStabilities)(original, updated, this.mismatches);
        (0, validations_1.validateStaticSame)(original, updated, this.mismatches);
        (0, validations_1.validateNotMadeImmutable)(original, updated, this.mismatches);
        if (this.subclassableType) {
            // Hello C# my old friend
            (0, validations_1.validatePropertyTypeSame)(original, updated, this.mismatches.withMotivation('type is @subclassable'));
        }
        else if (!original.immutable) {
            // If the type can be read, it can't be weakened (can't change Dog to Animal, consumers might be counting on a Dog).
            // If the type can be written, it can't be strengthened (can't change Animal to Dog, consumers might be sending a Cat).
            // => it must remain the same
            (0, validations_1.validatePropertyTypeSame)(original, updated, this.mismatches.withMotivation('mutable property cannot change type'));
        }
        else {
            (0, validations_1.validatePropertyTypeNotWeakened)(original, updated, this.mismatches);
        }
    }
    /**
     * Whether the current reference type has been marked as subclassable
     */
    get subclassableType() {
        return (0, validations_1.subclassableType)(this.oldType);
    }
}
exports.ComparableReferenceType = ComparableReferenceType;
class ComparableClassType extends ComparableReferenceType {
    /**
     * Perform the reference type comparison and include class-specific checks
     */
    compare() {
        super.compare();
        (0, validations_1.validateNotMadeAbstract)(this.oldType, this.newType, this.mismatches);
        // JSII assembler has already taken care of inheritance here
        if (this.oldType.initializer && this.newType.initializer) {
            (0, validations_1.validateMethodCompatible)(this.oldType.initializer, this.newType.initializer, this.mismatches);
        }
    }
    /**
     * Type role marking -- include the initializer
     */
    markTypeRoles() {
        if (this.oldType.initializer) {
            determineTypeRolesFromMethod(this.assemblyComparison, this.oldType.initializer);
        }
        super.markTypeRoles();
    }
}
exports.ComparableClassType = ComparableClassType;
/**
 * Interface type comparison
 *
 * (Actually just plain reference type comparison)
 */
class ComparableInterfaceType extends ComparableReferenceType {
}
exports.ComparableInterfaceType = ComparableInterfaceType;
/**
 * Struct type comparison
 *
 * Most notably: does no-strengthening/no-weakening checks based on whether
 * structs appear in input/output positions.
 */
class ComparableStructType extends ComparableType {
    compare() {
        LOG.debug(`Struct type ${this.oldType.fqn}`);
        (0, stability_1.validateStabilities)(this.oldType, this.newType, this.mismatches);
        (0, validations_1.validateBaseTypeAssignability)(this.oldType, this.newType, this.mismatches);
        this.validateNoPropertiesRemoved();
        if (this.inputType) {
            // If the struct is written, it can't be strengthened (ex: can't change an optional property to required)
            this.validateNotStrengthened(this.mismatches.withMotivation(this.inputTypeReason));
        }
        if (this.outputType) {
            // If the struct is read, it can't be weakened (ex: can't change a required property to optional)
            this.validateNotWeakened(this.mismatches.withMotivation(this.outputTypeReason));
        }
    }
    /**
     * Every type of every property should have the same in/out classification as the outer type
     */
    forEachRoleSharingType(cb) {
        for (const prop of this.oldType.allProperties) {
            for (const t of this.assemblyComparison.typesIn(prop.type)) {
                cb(t, `type of property ${prop.name}`);
            }
        }
    }
    /**
     * Check that all properties are still present
     *
     * This is because for all non-structurally typed languages it is not allowed
     * to specify members which aren't actually present in the type.
     */
    validateNoPropertiesRemoved() {
        // A single run of memberPairs() with nothing else will do this check.
        Array.from((0, validations_1.memberPairs)(this.oldType, this.oldType.allProperties, this.newType, this.mismatches));
    }
    /**
     * Check that the current type is not weakened
     */
    validateNotWeakened(mismatches) {
        const ana = this.isStructuralSuperType(this.oldType, this.newType);
        if (!ana.success) {
            mismatches.report({
                ruleKey: 'weakened',
                violator: this.oldType,
                message: ana.reasons.join(', '),
            });
        }
    }
    /**
     * Check that the current type is not strengthened
     */
    validateNotStrengthened(mismatches) {
        const ana = this.isStructuralSuperType(this.newType, this.oldType);
        if (!ana.success) {
            mismatches.report({
                ruleKey: 'strengthened',
                violator: this.oldType,
                message: ana.reasons.join(', '),
            });
        }
    }
    isStructuralSuperType(a, b) {
        try {
            return (0, type_analysis_1.isStructuralSuperType)(a, b, this.newType.system);
        }
        catch (e) {
            // We might get an exception if the type is supposed to come from a different
            // assembly and the lookup fails.
            return { success: false, reasons: [e.message] };
        }
    }
}
exports.ComparableStructType = ComparableStructType;
/**
 * Comparison for enums
 */
class ComparableEnumType extends ComparableType {
    /**
     * Perform comparisons on enum members
     */
    compare() {
        LOG.debug(`Enum type ${this.oldType.fqn}`);
        (0, stability_1.validateStabilities)(this.oldType, this.newType, this.mismatches);
        (0, validations_1.validateExistingMembers)(this.oldType, this.newType, this.mismatches, (oldMember, newMember) => {
            (0, stability_1.validateStabilities)(oldMember, newMember, this.mismatches);
        });
    }
}
exports.ComparableEnumType = ComparableEnumType;
/**
 * Determines input/output roles of types used in this method
 *
 * - Argument types are treated as IN types
 * - Return type is treated as OUT type
 */
function determineTypeRolesFromMethod(comparison, method) {
    if (reflect.isMethod(method)) {
        for (const t of comparison.typesIn(method.returns.type)) {
            t.markAsOutputType(`returned from ${(0, types_1.apiElementIdentifier)(method)}`);
        }
    }
    for (const param of method.parameters ?? []) {
        for (const t of comparison.typesIn(param.type)) {
            t.markAsInputType(`input to ${(0, types_1.apiElementIdentifier)(method)}`);
        }
    }
}
/**
 * Determines input/output roles of types used in this property
 *
 * - Property type is treated as OUT type
 * - If mutable, property type is also treated as IN type
 *
 * In effect, a property is treated as the following methods:
 *
 * - property(): T;
 * - setProperty(: T);  <- only if mutable
 */
function determineTypeRolesFromProperty(comparison, property) {
    for (const t of comparison.typesIn(property.type)) {
        t.markAsOutputType(`type of ${(0, types_1.apiElementIdentifier)(property)}`);
    }
    if (!property.immutable) {
        for (const t of comparison.typesIn(property.type)) {
            t.markAsInputType(`type of mutable ${(0, types_1.apiElementIdentifier)(property)}`);
        }
    }
}
/**
 * Return all the FQNs from a type reference
 *
 * In the simple case, a simple FQN, but the type might
 * be a union or complex type as well.
 */
function fqnsFrom(ref) {
    const ret = new Array();
    recurse(ref);
    return ret;
    function recurse(type) {
        if (type.mapOfType) {
            recurse(type.mapOfType);
        }
        else if (type.arrayOfType) {
            recurse(type.arrayOfType);
        }
        else if (type.unionOfTypes) {
            type.unionOfTypes.forEach(recurse);
        }
        else if (type.fqn) {
            ret.push(type.fqn);
        }
    }
}
function describeReasons(reasons) {
    if (reasons.length === 0) {
        return '';
    }
    if (reasons.length === 1) {
        return reasons[0];
    }
    return `${reasons[0]} (...and ${reasons.length - 1} more...)`;
}
//# sourceMappingURL=type-comparison.js.map