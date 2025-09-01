/**
 * The error raised when processing a package fails due to running out of disk
 * space while installing it's dependency closure in a temporary directory. This
 * error cannot be immediately recovered, short of deleting files to make more
 * space availabe, then retrying.
 *
 * Users may perform an `err instanceof NoSpaceLeftOnDevice` test to determine
 * whether this error was raised or not, and cut retry attempts.
 */
export declare class NoSpaceLeftOnDevice extends Error {
    readonly name: string;
}
/**
 * Generic error thrown by the library.
 */
export declare class DocGenError extends Error {
    readonly name: string;
}
/**
 * Raised when docgen is unable to install the given package.
 * This can happen due to invalid dependency clojures for example.
 */
export declare class UnInstallablePackageError extends DocGenError {
}
/**
 * Raised when docgen detects corrupted assemblies, preventing it from
 * generating documentation for a specific language.
 * This can happen either due to jsii compiler bugs, or authoring mistakes.
 *
 * For example: https://github.com/aws/jsii/pull/3147
 */
export declare class CorruptedAssemblyError extends DocGenError {
}
/**
 * Raised when a render is requested for a language the package does not support.
 */
export declare class LanguageNotSupportedError extends DocGenError {
}
/**
 * Raised when snippet transliteration into a target language failed.
 */
export declare class TransliterationError extends DocGenError {
}
/**
 * The error raised when `npm` commands fail with an "opaque" exit code,
 * attempting to obtain more information from the commands output.
 */
export declare class NpmError<T = unknown> extends DocGenError {
    /**
     * The name of this error.
     */
    readonly name: string;
    /**
     * The error code npm printed out to stderr or stdout before exiting. This can
     * provide more information about the error in a machine-friendlier way.
     *
     * This is extracted from log-parsing, and is hence not guaranteed to be
     * accurate.
     *
     * @example 'EPROTO'
     * @example 'E429'
     * @example 'E404'
     */
    readonly npmErrorCode: string | undefined;
    /**
     * Data the command produced to `STDOUT`.
     */
    readonly stdout: T;
}
