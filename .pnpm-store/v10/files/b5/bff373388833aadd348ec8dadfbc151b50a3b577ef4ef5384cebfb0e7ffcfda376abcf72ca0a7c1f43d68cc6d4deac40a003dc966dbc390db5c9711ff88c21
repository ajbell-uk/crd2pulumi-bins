"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const schema_1 = require("../schema");
class Property {
    constructor(transpile, property) {
        this.property = property;
        this.transpiled = transpile.property(property);
    }
    toJson() {
        var _a;
        return {
            fqn: `${this.transpiled.parentType.fqn}.property.${this.transpiled.name}`,
            displayName: this.transpiled.name,
            id: `${this.property.parentType.fqn}.property.${this.property.name}`,
            optional: this.transpiled.optional === true ? true : undefined, // to save space
            default: (_a = this.property.spec.docs) === null || _a === void 0 ? void 0 : _a.default,
            type: this.transpiled.typeReference.toJson(),
            docs: (0, schema_1.extractDocs)(this.property.docs),
            usage: this.transpiled.declaration,
        };
    }
}
exports.Property = Property;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZG9jZ2VuL3ZpZXcvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQXdEO0FBR3hELE1BQWEsUUFBUTtJQUVuQixZQUNFLFNBQW9CLEVBQ0gsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFFM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxNQUFNOztRQUNYLE9BQU87WUFDTCxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGFBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDekUsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTtZQUNqQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGFBQWEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDcEUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCO1lBQ2hGLE9BQU8sRUFBRSxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksMENBQUUsT0FBTztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksRUFBRSxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVztTQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckJELDRCQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHJlZmxlY3QgZnJvbSAnanNpaS1yZWZsZWN0JztcbmltcG9ydCB7IGV4dHJhY3REb2NzLCBQcm9wZXJ0eVNjaGVtYSB9IGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgeyBUcmFuc3BpbGUsIFRyYW5zcGlsZWRQcm9wZXJ0eSB9IGZyb20gJy4uL3RyYW5zcGlsZS90cmFuc3BpbGUnO1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuICBwcml2YXRlIHJlYWRvbmx5IHRyYW5zcGlsZWQ6IFRyYW5zcGlsZWRQcm9wZXJ0eTtcbiAgY29uc3RydWN0b3IoXG4gICAgdHJhbnNwaWxlOiBUcmFuc3BpbGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwcm9wZXJ0eTogcmVmbGVjdC5Qcm9wZXJ0eSxcbiAgKSB7XG4gICAgdGhpcy50cmFuc3BpbGVkID0gdHJhbnNwaWxlLnByb3BlcnR5KHByb3BlcnR5KTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pzb24oKTogUHJvcGVydHlTY2hlbWEge1xuICAgIHJldHVybiB7XG4gICAgICBmcW46IGAke3RoaXMudHJhbnNwaWxlZC5wYXJlbnRUeXBlLmZxbn0ucHJvcGVydHkuJHt0aGlzLnRyYW5zcGlsZWQubmFtZX1gLFxuICAgICAgZGlzcGxheU5hbWU6IHRoaXMudHJhbnNwaWxlZC5uYW1lLFxuICAgICAgaWQ6IGAke3RoaXMucHJvcGVydHkucGFyZW50VHlwZS5mcW59LnByb3BlcnR5LiR7dGhpcy5wcm9wZXJ0eS5uYW1lfWAsXG4gICAgICBvcHRpb25hbDogdGhpcy50cmFuc3BpbGVkLm9wdGlvbmFsID09PSB0cnVlID8gdHJ1ZSA6IHVuZGVmaW5lZCwgLy8gdG8gc2F2ZSBzcGFjZVxuICAgICAgZGVmYXVsdDogdGhpcy5wcm9wZXJ0eS5zcGVjLmRvY3M/LmRlZmF1bHQsXG4gICAgICB0eXBlOiB0aGlzLnRyYW5zcGlsZWQudHlwZVJlZmVyZW5jZS50b0pzb24oKSxcbiAgICAgIGRvY3M6IGV4dHJhY3REb2NzKHRoaXMucHJvcGVydHkuZG9jcyksXG4gICAgICB1c2FnZTogdGhpcy50cmFuc3BpbGVkLmRlY2xhcmF0aW9uLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==