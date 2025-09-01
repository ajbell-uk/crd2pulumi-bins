import * as reflect from 'jsii-reflect';
import { MarkdownDocument } from './markdown-doc';
import { ApiReferenceSchema, AssemblyMetadataSchema, ClassSchema, ConstructSchema, EnumMemberSchema, EnumSchema, InitializerSchema, InterfaceSchema, JsiiEntity, MethodSchema, ParameterSchema, PropertySchema, Schema, StructSchema, TypeSchema } from '../schema';
import { Language } from '../transpile/transpile';
export interface MarkdownFormattingOptions {
    /**
     * How jsii entity IDs should be formatted into anchors. This should be
     * customized in conjunction with `linkFormatter`.
     *
     * @param type - the entity we are creating an anchor for
     *
     * @experimental
     * @default - use the full id
     */
    readonly anchorFormatter?: (type: JsiiEntity) => string;
    /**
     * How should links to entities be rendered. For example, if a class or a
     * property is referenced within a description or table.
     *
     * The `metadata` parameter can be optionally used to customize links based
     * on whether or not the type belongs to the package / submodule that is
     * being generated.
     *
     * @param type - the entity we are creating a link for
     * @param metadata - information about the module being docgen-ed
     *
     * @experimental
     * @default - '<a href="#{type.id}">{type.displayName}</a>' if the type
     *   belongs to this package, '{type.fqn}' otherwise
     */
    readonly linkFormatter?: (type: JsiiEntity, metadata: AssemblyMetadataSchema) => string;
    /**
     * How type signatures should be formatted, including those made of nested
     * types (like `Map<string, Bucket>`).
     *
     * The `metadata` and `linkFormatter` parameters are provided so that links
     * can be included in the formatted types if desired.
     *
     * @param type - the type being formatted
     * @param metadata - information about the module being docgen-ed
     * @param linkFormatter - the type link formatter
     *
     * @experimental
     * @default - HTML code block with type references linked
     * according to `linkFormatter`
     */
    readonly typeFormatter?: (type: TypeSchema, metadata: AssemblyMetadataSchema, linkFormatter: (type: JsiiEntity, metadata: AssemblyMetadataSchema) => string) => string;
    readonly header?: {
        title: string;
        id: string;
    };
}
export interface MarkdownRendererOptions extends MarkdownFormattingOptions, AssemblyMetadataSchema {
    /**
     * Language the documentation is rendered for.
     */
    readonly language: Language;
}
/**
 * Generates `MarkdownDocument` instances from `API.json` or its parts.
 *
 * This class can be used in two ways:
 *
 * 1. Instantiate it via the constructor with `options`, which requires
 * passing in some global context about the module and language you are
 * generated for. (This context can be found in the top-level `metadata`
 * field of API.json.) Then, call a `visitXxx` method to generate a
 * `MarkdownDocument` for the appropriate part of the schema.
 *
 * 2. Generate a `MarkdownDocument` from the complete `API.json` using the
 * `fromSchema` static method (no instantiation needed). Global context is
 * automatically inferred from the API.json.
 *
 * Both choices allow customizing the output via `MarkdownFormattingOptions`.
 */
export declare class MarkdownRenderer {
    static fromSchema(schema: Schema, options: MarkdownFormattingOptions): MarkdownDocument;
    static fromSubmodules(submodules: readonly reflect.Submodule[], fileSuffix: string, options: MarkdownRendererOptions): MarkdownDocument;
    private readonly anchorFormatter;
    private readonly linkFormatter;
    private readonly typeFormatter;
    private readonly metadata;
    private readonly language;
    constructor(options: MarkdownRendererOptions);
    visitSubmodules(submodules: readonly reflect.Submodule[], fileSuffix: string): MarkdownDocument;
    visitApiReference(apiRef: ApiReferenceSchema, header?: {
        title: string;
        id: string;
    }): MarkdownDocument;
    visitConstructs(constructs: ConstructSchema[]): MarkdownDocument;
    visitStructs(structs: StructSchema[]): MarkdownDocument;
    visitClasses(classes: ClassSchema[]): MarkdownDocument;
    visitInterfaces(ifaces: InterfaceSchema[]): MarkdownDocument;
    visitEnums(enums: EnumSchema[]): MarkdownDocument;
    visitConstruct(construct: ConstructSchema): MarkdownDocument;
    visitStruct(struct: StructSchema): MarkdownDocument;
    visitClass(klass: ClassSchema): MarkdownDocument;
    visitInterface(iface: InterfaceSchema): MarkdownDocument;
    visitEnum(enu: EnumSchema): MarkdownDocument;
    visitEnumMembers(enus: EnumMemberSchema[]): MarkdownDocument;
    visitProperties(properties: PropertySchema[]): MarkdownDocument;
    visitInitializer(init: InitializerSchema): MarkdownDocument;
    visitInstanceMethods(methods: MethodSchema[]): MarkdownDocument;
    visitStaticFunctions(methods: MethodSchema[]): MarkdownDocument;
    visitConstants(constants: PropertySchema[]): MarkdownDocument;
    visitEnumMember(em: EnumMemberSchema): MarkdownDocument;
    visitProperty(prop: PropertySchema): MarkdownDocument;
    visitParameter(parameter: ParameterSchema): MarkdownDocument;
    visitInstanceMethod(method: MethodSchema): MarkdownDocument;
    visitStaticFunction(method: MethodSchema): MarkdownDocument;
    visitConstant(constant: PropertySchema): MarkdownDocument;
    private createTable;
    private createTableWithTypes;
}
export declare const defaultAnchorFormatter: (type: JsiiEntity) => string;
export declare const defaultLinkFormatter: (type: JsiiEntity, metadata: AssemblyMetadataSchema) => string;
export declare const defaultTypeFormatter: (type: TypeSchema, metadata: AssemblyMetadataSchema, linkFormatter: (type: JsiiEntity, metadata: AssemblyMetadataSchema) => string) => string;
