"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumMember = void 0;
const schema_1 = require("../schema");
class EnumMember {
    constructor(transpile, em) {
        this.em = em;
        this.transpiled = transpile.enumMember(em);
    }
    toJson() {
        return {
            id: `${this.em.enumType.fqn}.${this.em.name}`,
            displayName: this.transpiled.name,
            fqn: this.transpiled.fqn,
            docs: (0, schema_1.extractDocs)(this.em.docs),
        };
    }
}
exports.EnumMember = EnumMember;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS1tZW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZG9jZ2VuL3ZpZXcvZW51bS1tZW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQTBEO0FBRzFELE1BQWEsVUFBVTtJQUVyQixZQUFZLFNBQW9CLEVBQW1CLEVBQXNCO1FBQXRCLE9BQUUsR0FBRixFQUFFLENBQW9CO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU87WUFDTCxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDN0MsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTtZQUNqQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ3hCLElBQUksRUFBRSxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7U0FDaEMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcmVmbGVjdCBmcm9tICdqc2lpLXJlZmxlY3QnO1xuaW1wb3J0IHsgRW51bU1lbWJlclNjaGVtYSwgZXh0cmFjdERvY3MgfSBmcm9tICcuLi9zY2hlbWEnO1xuaW1wb3J0IHsgVHJhbnNwaWxlLCBUcmFuc3BpbGVkRW51bU1lbWJlciB9IGZyb20gJy4uL3RyYW5zcGlsZS90cmFuc3BpbGUnO1xuXG5leHBvcnQgY2xhc3MgRW51bU1lbWJlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNwaWxlZDogVHJhbnNwaWxlZEVudW1NZW1iZXI7XG4gIGNvbnN0cnVjdG9yKHRyYW5zcGlsZTogVHJhbnNwaWxlLCBwcml2YXRlIHJlYWRvbmx5IGVtOiByZWZsZWN0LkVudW1NZW1iZXIpIHtcbiAgICB0aGlzLnRyYW5zcGlsZWQgPSB0cmFuc3BpbGUuZW51bU1lbWJlcihlbSk7XG4gIH1cblxuICBwdWJsaWMgdG9Kc29uKCk6IEVudW1NZW1iZXJTY2hlbWEge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogYCR7dGhpcy5lbS5lbnVtVHlwZS5mcW59LiR7dGhpcy5lbS5uYW1lfWAsXG4gICAgICBkaXNwbGF5TmFtZTogdGhpcy50cmFuc3BpbGVkLm5hbWUsXG4gICAgICBmcW46IHRoaXMudHJhbnNwaWxlZC5mcW4sXG4gICAgICBkb2NzOiBleHRyYWN0RG9jcyh0aGlzLmVtLmRvY3MpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==