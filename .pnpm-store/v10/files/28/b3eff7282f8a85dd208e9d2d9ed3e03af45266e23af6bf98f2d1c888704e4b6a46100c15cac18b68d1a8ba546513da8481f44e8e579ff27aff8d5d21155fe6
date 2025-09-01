import { Language } from '../..';
import { DocsSchema } from '../schema';
/**
 * Options for defining a markdown header.
 */
export interface MarkdownHeaderOptions {
    /**
     * Title to be displayed.
     */
    readonly title?: string;
    /**
     * Superscript.
     *
     * @default - No superscript
     */
    readonly sup?: string;
    /**
     * Preformat the header.
     *
     * @default false
     */
    readonly pre?: boolean;
    /**
     * Strikethough the title.
     *
     * @default false
     */
    readonly strike?: boolean;
}
/**
 * Options for defining a markdown element.
 */
export interface MarkdownOptions {
    /**
     * Markdown header.
     *
     * @default - No header.
     */
    readonly header?: MarkdownHeaderOptions;
    /**
     * Id of the element.
     *
     * @default - The title will be used.
     */
    readonly id?: string;
}
/**
 * Markdown element.
 */
export declare class MarkdownDocument {
    private readonly options;
    /**
     * An empty markdown element.
     */
    static readonly EMPTY: MarkdownDocument;
    /**
     * Sanitize markdown reserved characters from external input.
     */
    static sanitize(line: string): string;
    /**
     * Remove newlines from markdown.
     */
    static removeNewlines(line: string): string;
    static bold(text: string): string;
    static pre(text: string): string;
    static italic(text: string): string;
    private readonly _lines;
    private readonly _sections;
    private readonly id?;
    private readonly header?;
    constructor(options?: MarkdownOptions);
    /**
     * Render a docs element into the markdown.
     */
    docs(docs: DocsSchema, language?: Language): void;
    table(data: string[][]): void;
    quote(line: string): void;
    bullet(line: string): void;
    code(language: string, ...snippet: string[]): void;
    lines(...lines: string[]): void;
    split(): void;
    section(section: MarkdownDocument): void;
    render(headerSize?: number): string;
    private formatHeader;
    private escapePipes;
}
