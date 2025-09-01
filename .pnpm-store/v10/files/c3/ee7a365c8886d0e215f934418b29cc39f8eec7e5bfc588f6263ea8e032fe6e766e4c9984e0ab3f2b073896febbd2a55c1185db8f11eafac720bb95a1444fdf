"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
const enum_member_1 = require("./enum-member");
const schema_1 = require("../schema");
class Enum {
    constructor(transpile, enu) {
        this.transpile = transpile;
        this.enu = enu;
        this.transpiled = this.transpile.enum(this.enu);
        this.members = enu.members.map((em) => new enum_member_1.EnumMember(transpile, em));
    }
    toJson() {
        return {
            fqn: this.transpiled.fqn,
            displayName: this.transpiled.fqn.split('.').pop(),
            id: this.enu.fqn,
            members: this.members.map((em) => em.toJson()),
            docs: (0, schema_1.extractDocs)(this.enu.docs),
        };
    }
}
exports.Enum = Enum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2NnZW4vdmlldy9lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLCtDQUEyQztBQUMzQyxzQ0FBb0Q7QUFHcEQsTUFBYSxJQUFJO0lBR2YsWUFDbUIsU0FBb0IsRUFDcEIsR0FBcUI7UUFEckIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUV0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLHdCQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPO1lBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRztZQUN4QixXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRztZQUNsRCxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO1lBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlDLElBQUksRUFBRSxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXBCRCxvQkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyByZWZsZWN0IGZyb20gJ2pzaWktcmVmbGVjdCc7XG5pbXBvcnQgeyBFbnVtTWVtYmVyIH0gZnJvbSAnLi9lbnVtLW1lbWJlcic7XG5pbXBvcnQgeyBFbnVtU2NoZW1hLCBleHRyYWN0RG9jcyB9IGZyb20gJy4uL3NjaGVtYSc7XG5pbXBvcnQgeyBUcmFuc3BpbGUsIFRyYW5zcGlsZWRFbnVtIH0gZnJvbSAnLi4vdHJhbnNwaWxlL3RyYW5zcGlsZSc7XG5cbmV4cG9ydCBjbGFzcyBFbnVtIHtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmFuc3BpbGVkOiBUcmFuc3BpbGVkRW51bTtcbiAgcHJpdmF0ZSByZWFkb25seSBtZW1iZXJzOiBFbnVtTWVtYmVyW107XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNwaWxlOiBUcmFuc3BpbGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBlbnU6IHJlZmxlY3QuRW51bVR5cGUsXG4gICkge1xuICAgIHRoaXMudHJhbnNwaWxlZCA9IHRoaXMudHJhbnNwaWxlLmVudW0odGhpcy5lbnUpO1xuICAgIHRoaXMubWVtYmVycyA9IGVudS5tZW1iZXJzLm1hcCgoZW0pID0+IG5ldyBFbnVtTWVtYmVyKHRyYW5zcGlsZSwgZW0pKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pzb24oKTogRW51bVNjaGVtYSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZxbjogdGhpcy50cmFuc3BpbGVkLmZxbixcbiAgICAgIGRpc3BsYXlOYW1lOiB0aGlzLnRyYW5zcGlsZWQuZnFuLnNwbGl0KCcuJykucG9wKCkhLFxuICAgICAgaWQ6IHRoaXMuZW51LmZxbixcbiAgICAgIG1lbWJlcnM6IHRoaXMubWVtYmVycy5tYXAoKGVtKSA9PiBlbS50b0pzb24oKSksXG4gICAgICBkb2NzOiBleHRyYWN0RG9jcyh0aGlzLmVudS5kb2NzKSxcbiAgICB9O1xuICB9XG59XG4iXX0=