"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Readme = void 0;
const markdown_doc_1 = require("../render/markdown-doc");
/**
 * Render the user defined readme of a jsii library.
 */
class Readme {
    constructor(transpile, assembly, submodule) {
        const readme = submodule ? submodule.readme : assembly.readme;
        this.readme = readme ? transpile.readme(readme.markdown) : undefined;
    }
    /**
     * Generate markdown.
     */
    render() {
        if (!this.readme) {
            return markdown_doc_1.MarkdownDocument.EMPTY;
        }
        const md = new markdown_doc_1.MarkdownDocument();
        if (this.readme) {
            md.lines(this.readme);
        }
        return md;
    }
}
exports.Readme = Readme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZG1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RvY2dlbi92aWV3L3JlYWRtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5REFBMEQ7QUFHMUQ7O0dBRUc7QUFDSCxNQUFhLE1BQU07SUFHakIsWUFDRSxTQUFvQixFQUNwQixRQUEwQixFQUMxQixTQUE2QjtRQUU3QixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsT0FBTywrQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUVELE1BQU0sRUFBRSxHQUFHLElBQUksK0JBQWdCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7QUExQkQsd0JBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcmVmbGVjdCBmcm9tICdqc2lpLXJlZmxlY3QnO1xuaW1wb3J0IHsgTWFya2Rvd25Eb2N1bWVudCB9IGZyb20gJy4uL3JlbmRlci9tYXJrZG93bi1kb2MnO1xuaW1wb3J0IHsgVHJhbnNwaWxlIH0gZnJvbSAnLi4vdHJhbnNwaWxlL3RyYW5zcGlsZSc7XG5cbi8qKlxuICogUmVuZGVyIHRoZSB1c2VyIGRlZmluZWQgcmVhZG1lIG9mIGEganNpaSBsaWJyYXJ5LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZG1lIHtcbiAgcHJpdmF0ZSByZWFkb25seSByZWFkbWU/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdHJhbnNwaWxlOiBUcmFuc3BpbGUsXG4gICAgYXNzZW1ibHk6IHJlZmxlY3QuQXNzZW1ibHksXG4gICAgc3VibW9kdWxlPzogcmVmbGVjdC5TdWJtb2R1bGUsXG4gICkge1xuICAgIGNvbnN0IHJlYWRtZSA9IHN1Ym1vZHVsZSA/IHN1Ym1vZHVsZS5yZWFkbWUgOiBhc3NlbWJseS5yZWFkbWU7XG4gICAgdGhpcy5yZWFkbWUgPSByZWFkbWUgPyB0cmFuc3BpbGUucmVhZG1lKHJlYWRtZS5tYXJrZG93bikgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgbWFya2Rvd24uXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyKCk6IE1hcmtkb3duRG9jdW1lbnQge1xuICAgIGlmICghdGhpcy5yZWFkbWUpIHtcbiAgICAgIHJldHVybiBNYXJrZG93bkRvY3VtZW50LkVNUFRZO1xuICAgIH1cblxuICAgIGNvbnN0IG1kID0gbmV3IE1hcmtkb3duRG9jdW1lbnQoKTtcbiAgICBpZiAodGhpcy5yZWFkbWUpIHtcbiAgICAgIG1kLmxpbmVzKHRoaXMucmVhZG1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG1kO1xuICB9XG59XG4iXX0=