"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
jest.setTimeout(50000);
// ----------------------------------------------------------------------
test('type unions in return structs can be the same', () => (0, util_1.expectNoError)(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `));
// ----------------------------------------------------------------------
test('type unions in return structs can be narrowed', () => (0, util_1.expectNoError)(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `));
// ----------------------------------------------------------------------
test('type unions in return structs can not be widened', () => (0, util_1.expectError)(/some of boolean \| number \| string are not assignable to number \| string/, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string | number | boolean;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `));
// ----------------------------------------------------------------------
test('type unions in input structs can be the same', () => (0, util_1.expectNoError)(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `));
// ----------------------------------------------------------------------
test('type unions in input structs can be widened', () => (0, util_1.expectNoError)(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string | number | boolean;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `));
// ----------------------------------------------------------------------
test('type unions in input structs can not be narrowed', () => (0, util_1.expectError)(/number \| string is not assignable to string/, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `));
//# sourceMappingURL=type-unions.test.js.map