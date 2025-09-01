"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownDocument = void 0;
/**
 * Markdown element.
 */
class MarkdownDocument {
    /**
     * Sanitize markdown reserved characters from external input.
     */
    static sanitize(line) {
        let sanitized = line.trim();
        if (line.startsWith('-')) {
            sanitized = sanitized.substring(1, line.length).trim();
        }
        return sanitized;
    }
    /**
     * Remove newlines from markdown.
     */
    static removeNewlines(line) {
        return line.replace(/\n/g, ' ');
    }
    static bold(text) {
        return `**${text}**`;
    }
    static pre(text) {
        // using <code> instead of backticks since this allows links
        return `<code>${text}</code>`;
    }
    static italic(text) {
        return `*${text}*`;
    }
    constructor(options = {}) {
        var _a, _b;
        this.options = options;
        this._lines = new Array();
        this._sections = new Array();
        this.id = (_a = options.id) !== null && _a !== void 0 ? _a : (_b = options.header) === null || _b === void 0 ? void 0 : _b.title;
        this.header = this.formatHeader();
    }
    /**
     * Render a docs element into the markdown.
     */
    docs(docs, language) {
        if (docs.summary) {
            this.lines(MarkdownDocument.sanitize(docs.summary));
            this.lines('');
        }
        if (docs.remarks) {
            this.lines(MarkdownDocument.sanitize(docs.remarks));
            this.lines('');
        }
        if (docs.links) {
            for (const link of docs.links) {
                this.quote(`[${link}](${link})`);
            }
        }
        if (docs.example) {
            if (!language) {
                throw new Error('language must be provided if docs.example has been specified');
            }
            const example = new MarkdownDocument({
                id: `${this.options.id}.example`,
            });
            example.lines(MarkdownDocument.italic('Example'), '');
            example.code(language.toString(), docs.example);
            example.lines('');
            this.section(example);
        }
    }
    table(data) {
        const numColumns = data[0].length;
        const header = data[0];
        const rows = data.slice(1);
        this.lines('| ' + header.map(this.escapePipes).join(' | ') + ' |');
        this.lines('|' + ' --- |'.repeat(numColumns));
        for (const row of rows) {
            this.lines('| ' + row.map(this.escapePipes).join(' | ') + ' |');
        }
        this.lines('');
    }
    quote(line) {
        this.lines(`> ${line}`);
        this.lines('');
    }
    bullet(line) {
        this.lines(`- ${line}`);
    }
    code(language, ...snippet) {
        this.lines(`\`\`\`${language}`, ...snippet, '```');
        this.lines('');
    }
    lines(...lines) {
        this._lines.push(...lines);
    }
    split() {
        this.lines('---');
        this.lines('');
    }
    section(section) {
        this._sections.push(section);
    }
    render(headerSize = 0) {
        var _a, _b;
        const content = [];
        if (this.header) {
            if (headerSize > 6) {
                // headers are mapped to `h1-h6` html elements.
                // passed that, markdown just renders `#` signs.
                // lets see if and when we'll hit this limit.
                throw new Error('Unable to render markdown. Header limit (6) reached.');
            }
            const heading = `${'#'.repeat(headerSize)} ${this.header}`;
            // temporary hack to avoid breaking Construct Hub
            const headerSpan = !!process.env.HEADER_SPAN;
            if (headerSpan) {
                content.push(`${heading} <span data-heading-title="${(_a = this.options.header) === null || _a === void 0 ? void 0 : _a.title}" data-heading-id="${this.id}"></span>`);
            }
            else {
                content.push(`${heading} <a name="${(_b = this.options.header) === null || _b === void 0 ? void 0 : _b.title}" id="${this.id}"></a>`);
            }
            content.push('');
        }
        for (const line of this._lines) {
            content.push(`${line}`);
        }
        for (const section of this._sections) {
            content.push(section.render(headerSize + 1));
        }
        return content.join('\n');
    }
    formatHeader() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!((_a = this.options.header) === null || _a === void 0 ? void 0 : _a.title)) {
            return undefined;
        }
        let caption = this.options.header.title;
        if ((_c = (_b = this.options.header) === null || _b === void 0 ? void 0 : _b.pre) !== null && _c !== void 0 ? _c : false) {
            caption = `\`${caption}\``;
        }
        if ((_e = (_d = this.options.header) === null || _d === void 0 ? void 0 : _d.strike) !== null && _e !== void 0 ? _e : false) {
            caption = `~~${caption}~~`;
        }
        if ((_f = this.options.header) === null || _f === void 0 ? void 0 : _f.sup) {
            caption = `${caption}<sup>${(_g = this.options.header) === null || _g === void 0 ? void 0 : _g.sup}</sup>`;
        }
        return caption;
    }
    escapePipes(line) {
        return line.replace(/\|/g, '\\|');
    }
}
exports.MarkdownDocument = MarkdownDocument;
/**
 * An empty markdown element.
 */
MarkdownDocument.EMPTY = new MarkdownDocument();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24tZG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RvY2dlbi9yZW5kZXIvbWFya2Rvd24tZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXFEQTs7R0FFRztBQUNILE1BQWEsZ0JBQWdCO0lBTTNCOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFZO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN6QixTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQVk7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFZO1FBQzdCLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFZO1FBQzVCLDREQUE0RDtRQUM1RCxPQUFPLFNBQVMsSUFBSSxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUMvQixPQUFPLElBQUksSUFBSSxHQUFHLENBQUM7SUFDckIsQ0FBQztJQVFELFlBQTZCLFVBQTJCLEVBQUU7O1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBTnpDLFdBQU0sR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1FBQzdCLGNBQVMsR0FBRyxJQUFJLEtBQUssRUFBb0IsQ0FBQztRQU16RCxJ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QyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUV4QyxJQUFJLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sMENBQUUsR0FBRyxtQ0FBSSxLQUFLLEVBQUUsQ0FBQztZQUN0QyxPQUFPLEdBQUcsS0FBSyxPQUFPLElBQUksQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLDBDQUFFLE1BQU0sbUNBQUksS0FBSyxFQUFFLENBQUM7WUFDekMsT0FBTyxHQUFHLEtBQUssT0FBTyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sMENBQUUsR0FBRyxFQUFFLENBQUM7WUFDN0IsT0FBTyxHQUFHLEdBQUcsT0FBTyxRQUFRLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLDBDQUFFLEdBQUcsUUFBUSxDQUFDO1FBQy9ELENBQUM7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRU8sV0FBVyxDQUFDLElBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztBQXBMSCw0Q0FxTEM7QUFwTEM7O0dBRUc7QUFDb0Isc0JBQUssR0FBRyxJQUFJLGdCQUFnQixFQUFFLEFBQXpCLENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBEb2NzU2NoZW1hIH0gZnJvbSAnLi4vc2NoZW1hJztcblxuLyoqXG4gKiBPcHRpb25zIGZvciBkZWZpbmluZyBhIG1hcmtkb3duIGhlYWRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bkhlYWRlck9wdGlvbnMge1xuICAvKipcbiAgICogVGl0bGUgdG8gYmUgZGlzcGxheWVkLlxuICAgKi9cbiAgcmVhZG9ubHkgdGl0bGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFN1cGVyc2NyaXB0LlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIE5vIHN1cGVyc2NyaXB0XG4gICAqL1xuICByZWFkb25seSBzdXA/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFByZWZvcm1hdCB0aGUgaGVhZGVyLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgcmVhZG9ubHkgcHJlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3RyaWtldGhvdWdoIHRoZSB0aXRsZS5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHJlYWRvbmx5IHN0cmlrZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgZGVmaW5pbmcgYSBtYXJrZG93biBlbGVtZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hcmtkb3duT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBNYXJrZG93biBoZWFkZXIuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gTm8gaGVhZGVyLlxuICAgKi9cbiAgcmVhZG9ubHkgaGVhZGVyPzogTWFya2Rvd25IZWFkZXJPcHRpb25zO1xuXG4gIC8qKlxuICAgKiBJZCBvZiB0aGUgZWxlbWVudC5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBUaGUgdGl0bGUgd2lsbCBiZSB1c2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgaWQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogTWFya2Rvd24gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1hcmtkb3duRG9jdW1lbnQge1xuICAvKipcbiAgICogQW4gZW1wdHkgbWFya2Rvd24gZWxlbWVudC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRU1QVFkgPSBuZXcgTWFya2Rvd25Eb2N1bWVudCgpO1xuXG4gIC8qKlxuICAgKiBTYW5pdGl6ZSBtYXJrZG93biByZXNlcnZlZCBjaGFyYWN0ZXJzIGZyb20gZXh0ZXJuYWwgaW5wdXQuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNhbml0aXplKGxpbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHNhbml0aXplZCA9IGxpbmUudHJpbSgpO1xuXG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnLScpKSB7XG4gICAgICBzYW5pdGl6ZWQgPSBzYW5pdGl6ZWQuc3Vic3RyaW5nKDEsIGxpbmUubGVuZ3RoKS50cmltKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNhbml0aXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbmV3bGluZXMgZnJvbSBtYXJrZG93bi5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlTmV3bGluZXMobGluZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9cXG4vZywgJyAnKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYm9sZCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgKioke3RleHR9KipgO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBwcmUodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyB1c2luZyA8Y29kZT4gaW5zdGVhZCBvZiBiYWNrdGlja3Mgc2luY2UgdGhpcyBhbGxvd3MgbGlua3NcbiAgICByZXR1cm4gYDxjb2RlPiR7dGV4dH08L2NvZGU+YDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXRhbGljKHRleHQ6IHN0cmluZykge1xuICAgIHJldHVybiBgKiR7dGV4dH0qYDtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2xpbmVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2VjdGlvbnMgPSBuZXcgQXJyYXk8TWFya2Rvd25Eb2N1bWVudD4oKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGlkPzogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IGhlYWRlcj86IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IE1hcmtkb3duT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQgPz8gb3B0aW9ucy5oZWFkZXI/LnRpdGxlO1xuICAgIHRoaXMuaGVhZGVyID0gdGhpcy5mb3JtYXRIZWFkZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBkb2NzIGVsZW1lbnQgaW50byB0aGUgbWFya2Rvd24uXG4gICAqL1xuICBwdWJsaWMgZG9jcyhkb2NzOiBEb2NzU2NoZW1hLCBsYW5ndWFnZT86IExhbmd1YWdlKSB7XG4gICAgaWYgKGRvY3Muc3VtbWFyeSkge1xuICAgICAgdGhpcy5saW5lcyhNYXJrZG93bkRvY3VtZW50LnNhbml0aXplKGRvY3Muc3VtbWFyeSkpO1xuICAgICAgdGhpcy5saW5lcygnJyk7XG4gICAgfVxuICAgIGlmIChkb2NzLnJlbWFya3MpIHtcbiAgICAgIHRoaXMubGluZXMoTWFya2Rvd25Eb2N1bWVudC5zYW5pdGl6ZShkb2NzLnJlbWFya3MpKTtcbiAgICAgIHRoaXMubGluZXMoJycpO1xuICAgIH1cblxuICAgIGlmIChkb2NzLmxpbmtzKSB7XG4gICAgICBmb3IgKGNvbnN0IGxpbmsgb2YgZG9jcy5saW5rcykge1xuICAgICAgICB0aGlzLnF1b3RlKGBbJHtsaW5rfV0oJHtsaW5rfSlgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG9jcy5leGFtcGxlKSB7XG4gICAgICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbGFuZ3VhZ2UgbXVzdCBiZSBwcm92aWRlZCBpZiBkb2NzLmV4YW1wbGUgaGFzIGJlZW4gc3BlY2lmaWVkJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBleGFtcGxlID0gbmV3IE1hcmtkb3duRG9jdW1lbnQoe1xuICAgICAgICBpZDogYCR7dGhpcy5vcHRpb25zLmlkfS5leGFtcGxlYCxcbiAgICAgIH0pO1xuICAgICAgZXhhbXBsZS5saW5lcyhNYXJrZG93bkRvY3VtZW50Lml0YWxpYygnRXhhbXBsZScpLCAnJyk7XG4gICAgICBleGFtcGxlLmNvZGUobGFuZ3VhZ2UudG9TdHJpbmcoKSwgZG9jcy5leGFtcGxlKTtcbiAgICAgIGV4YW1wbGUubGluZXMoJycpO1xuICAgICAgdGhpcy5zZWN0aW9uKGV4YW1wbGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0YWJsZShkYXRhOiBzdHJpbmdbXVtdKSB7XG4gICAgY29uc3QgbnVtQ29sdW1ucyA9IGRhdGFbMF0ubGVuZ3RoO1xuICAgIGNvbnN0IGhlYWRlciA9IGRhdGFbMF07XG4gICAgY29uc3Qgcm93cyA9IGRhdGEuc2xpY2UoMSk7XG4gICAgdGhpcy5saW5lcygnfCAnICsgaGVhZGVyLm1hcCh0aGlzLmVzY2FwZVBpcGVzKS5qb2luKCcgfCAnKSArICcgfCcpO1xuICAgIHRoaXMubGluZXMoJ3wnICsgJyAtLS0gfCcucmVwZWF0KG51bUNvbHVtbnMpKTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICB0aGlzLmxpbmVzKCd8ICcgKyByb3cubWFwKHRoaXMuZXNjYXBlUGlwZXMpLmpvaW4oJyB8ICcpICsgJyB8Jyk7XG4gICAgfVxuICAgIHRoaXMubGluZXMoJycpO1xuICB9XG5cbiAgcHVibGljIHF1b3RlKGxpbmU6IHN0cmluZykge1xuICAgIHRoaXMubGluZXMoYD4gJHtsaW5lfWApO1xuICAgIHRoaXMubGluZXMoJycpO1xuICB9XG5cbiAgcHVibGljIGJ1bGxldChsaW5lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxpbmVzKGAtICR7bGluZX1gKTtcbiAgfVxuXG4gIHB1YmxpYyBjb2RlKGxhbmd1YWdlOiBzdHJpbmcsIC4uLnNuaXBwZXQ6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5saW5lcyhgXFxgXFxgXFxgJHtsYW5ndWFnZX1gLCAuLi5zbmlwcGV0LCAnYGBgJyk7XG4gICAgdGhpcy5saW5lcygnJyk7XG4gIH1cblxuICBwdWJsaWMgbGluZXMoLi4ubGluZXM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fbGluZXMucHVzaCguLi5saW5lcyk7XG4gIH1cblxuICBwdWJsaWMgc3BsaXQoKSB7XG4gICAgdGhpcy5saW5lcygnLS0tJyk7XG4gICAgdGhpcy5saW5lcygnJyk7XG4gIH1cblxuICBwdWJsaWMgc2VjdGlvbihzZWN0aW9uOiBNYXJrZG93bkRvY3VtZW50KSB7XG4gICAgdGhpcy5fc2VjdGlvbnMucHVzaChzZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoaGVhZGVyU2l6ZTogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gICAgY29uc3QgY29udGVudDogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgaWYgKGhlYWRlclNpemUgPiA2KSB7XG4gICAgICAgIC8vIGhlYWRlcnMgYXJlIG1hcHBlZCB0byBgaDEtaDZgIGh0bWwgZWxlbWVudHMuXG4gICAgICAgIC8vIHBhc3NlZCB0aGF0LCBtYXJrZG93biBqdXN0IHJlbmRlcnMgYCNgIHNpZ25zLlxuICAgICAgICAvLyBsZXRzIHNlZSBpZiBhbmQgd2hlbiB3ZSdsbCBoaXQgdGhpcyBsaW1pdC5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcmVuZGVyIG1hcmtkb3duLiBIZWFkZXIgbGltaXQgKDYpIHJlYWNoZWQuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhlYWRpbmcgPSBgJHsnIycucmVwZWF0KGhlYWRlclNpemUpfSAke3RoaXMuaGVhZGVyfWA7XG5cbiAgICAgIC8vIHRlbXBvcmFyeSBoYWNrIHRvIGF2b2lkIGJyZWFraW5nIENvbnN0cnVjdCBIdWJcbiAgICAgIGNvbnN0IGhlYWRlclNwYW4gPSAhIXByb2Nlc3MuZW52LkhFQURFUl9TUEFOO1xuICAgICAgaWYgKGhlYWRlclNwYW4pIHtcbiAgICAgICAgY29udGVudC5wdXNoKFxuICAgICAgICAgIGAke2hlYWRpbmd9IDxzcGFuIGRhdGEtaGVhZGluZy10aXRsZT1cIiR7dGhpcy5vcHRpb25zLmhlYWRlcj8udGl0bGV9XCIgZGF0YS1oZWFkaW5nLWlkPVwiJHt0aGlzLmlkfVwiPjwvc3Bhbj5gLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudC5wdXNoKGAke2hlYWRpbmd9IDxhIG5hbWU9XCIke3RoaXMub3B0aW9ucy5oZWFkZXI/LnRpdGxlfVwiIGlkPVwiJHt0aGlzLmlkfVwiPjwvYT5gKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQucHVzaCgnJyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIHRoaXMuX2xpbmVzKSB7XG4gICAgICBjb250ZW50LnB1c2goYCR7bGluZX1gKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNlY3Rpb24gb2YgdGhpcy5fc2VjdGlvbnMpIHtcbiAgICAgIGNvbnRlbnQucHVzaChzZWN0aW9uLnJlbmRlcihoZWFkZXJTaXplICsgMSkpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGVudC5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0SGVhZGVyKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaGVhZGVyPy50aXRsZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGV0IGNhcHRpb24gPSB0aGlzLm9wdGlvbnMuaGVhZGVyLnRpdGxlO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWFkZXI/LnByZSA/PyBmYWxzZSkge1xuICAgICAgY2FwdGlvbiA9IGBcXGAke2NhcHRpb259XFxgYDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcj8uc3RyaWtlID8/IGZhbHNlKSB7XG4gICAgICBjYXB0aW9uID0gYH5+JHtjYXB0aW9ufX5+YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcj8uc3VwKSB7XG4gICAgICBjYXB0aW9uID0gYCR7Y2FwdGlvbn08c3VwPiR7dGhpcy5vcHRpb25zLmhlYWRlcj8uc3VwfTwvc3VwPmA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb247XG4gIH1cblxuICBwcml2YXRlIGVzY2FwZVBpcGVzKGxpbmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXFx8L2csICdcXFxcfCcpO1xuICB9XG59XG4iXX0=