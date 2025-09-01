import * as reflect from 'jsii-reflect';
import { TargetLanguage } from 'jsii-rosetta';
import { Json } from '../render/json';
import { MarkdownDocument } from '../render/markdown-doc';
import { MarkdownFormattingOptions } from '../render/markdown-render';
import { Schema } from '../schema';
import { CSharpTranspile } from '../transpile/csharp';
import { GoTranspile } from '../transpile/go';
import { JavaTranspile } from '../transpile/java';
import { PythonTranspile } from '../transpile/python';
import { Language } from '../transpile/transpile';
import { TypeScriptTranspile } from '../transpile/typescript';
/**
 * Options for rendering a `Documentation` object.
 */
export interface RenderOptions extends TransliterationOptions {
    /**
     * Which language to generate docs for.
     */
    readonly language: Language;
    /**
     * Include a generated api reference in the documentation.
     *
     * @default true
     */
    readonly apiReference?: boolean;
    /**
     * Include the user defined README.md in the documentation.
     *
     * @default false
     */
    readonly readme?: boolean;
    /**
     * Generate documentation only for a specific submodule.
     *
     * @default - Documentation is generated for the root module only.
     */
    readonly submodule?: string;
    /**
     * Generate a single document with APIs from all assembly submodules
     * (including the root).
     *
     * Note: only the root-level README is included.
     *
     * @default false
     */
    readonly allSubmodules?: boolean;
}
export interface TransliterationOptions {
    /**
     * Whether to ignore missing fixture files that will prevent transliterating
     * some code snippet examples.
     *
     * @default true
     */
    readonly loose?: boolean;
    /**
     * Whether to validate jsii assemblies against the jsii schema before
     * using them.
     *
     * @default false
     */
    readonly validate?: boolean;
}
export interface MarkdownRenderOptions extends RenderOptions, MarkdownFormattingOptions {
}
/**
 * Options for creating a `Documentation` object using the `fromLocalPackage` function.
 */
export interface ForLocalPackageDocumentationOptions {
    /**
     * A local directory containing jsii assembly files that will
     * comprise the type-system.
     *
     * @default - the root package directory will be used.
     */
    readonly assembliesDir?: string;
}
export interface ForPackageDocumentationOptions {
    /**
     * Whether verbose logging is to be performed.
     *
     * @default true
     */
    readonly verbose?: boolean;
}
/**
 * Render documentation pages for a jsii library.
 */
export declare class Documentation {
    private readonly assemblyName;
    private readonly assembliesDir;
    /**
     * Create a `Documentation` object from a package installable by npm.
     *
     * Note that this method installs the target package to the local file-system. Make sure
     * to call `Documentation.cleanup` once you are done rendering.
     *
     * @param target - The target to install. This can either be a local path or a registry identifier (e.g <name>@<version>)
     * @param options - Additional options.
     *
     * @throws NoSpaceLeftOnDevice if the installation fails due to running out of disk space
     * @throws NpmError if some `npm` command fails when preparing the working set
     */
    static forPackage(target: string, options?: ForPackageDocumentationOptions): Promise<Documentation>;
    /**
     * Create a `Documentation` object from a local directory containing a node project.
     *
     * @param root - The local directory path. Must contain a package.json file.
     * @param options - Additional options.
     */
    static forProject(root: string, options?: ForLocalPackageDocumentationOptions): Promise<Documentation>;
    /**
     * Create a `Documentation` object for a specific assembly from a directory of assemblies.
     *
     * @param assemblyName - The assembly name.
     * @param assembliesDir - The directory containing the assemblies that comprise the type-system.
     */
    static forAssembly(assemblyName: string, assembliesDir: string): Promise<Documentation>;
    private readonly cleanupDirectories;
    private readonly assembliesCache;
    private assemblyFqn;
    private constructor();
    /**
     * List all submodules in the assembly.
     */
    listSubmodules(): Promise<readonly reflect.Submodule[]>;
    toIndexMarkdown(fileSuffix: string, options: RenderOptions): Promise<MarkdownDocument>;
    /**
     * Generate markdown.
     */
    toJson(options: RenderOptions): Promise<Json<Schema>>;
    toMarkdown(options: MarkdownRenderOptions): Promise<MarkdownDocument>;
    private addCleanupDirectory;
    /**
     * Removes any internal working directories.
     */
    cleanup(): Promise<void>;
    private languageSpecific;
    /**
     * Lookup a submodule by a submodule name.
     *
     * The contract of this function is historically quite confused: the submodule
     * name can be either an FQN (`asm.sub1.sub2`) or just a submodule name
     * (`sub1` or `sub1.sub2`).
     *
     * This is sligthly complicated by ambiguity: `asm.asm.package` and
     * `asm.package` can both exist, and which one do you mean when you say
     * `asm.package`?
     *
     * We prefer an FQN match if possible (`asm.sub1.sub2`), but will accept a
     * root-relative submodule name as well (`sub1.sub2`).
     */
    private findSubmodule;
    private createAssembly;
}
export declare const LANGUAGE_SPECIFIC: {
    [x: string]: {
        transpile: PythonTranspile;
        rosettaTarget: TargetLanguage;
    } | {
        transpile: TypeScriptTranspile;
        rosettaTarget: undefined;
    } | {
        transpile: JavaTranspile;
        rosettaTarget: TargetLanguage;
    } | {
        transpile: CSharpTranspile;
        rosettaTarget: TargetLanguage;
    } | {
        transpile: GoTranspile;
        rosettaTarget: TargetLanguage;
    };
};
export declare function extractPackageName(spec: string): string;
