"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
// Note: an enum with one value behaves weirdly in TypeScript -- it does type analysis to the singleton element.
// ----------------------------------------------------------------------
jest.setTimeout(15000);
test('okay to add a member to an enum', () => (0, util_1.expectNoError)(`
    export enum Foo {
      BAR,
      BAZ,
    }
  `, `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `));
// ----------------------------------------------------------------------
test('not okay to remove a member from an enum', () => (0, util_1.expectError)(/member QUUX has been removed/, `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `, `
    export enum Foo {
      BAR,
      BAZ
    }
  `));
// ----------------------------------------------------------------------
test('does not crash when removing enum', () => (0, util_1.expectError)(/ENUM testpkg.Foo: has been removed/, `
    export enum Foo {
      BAR,
      BAZ,
      QUUX
    }
  `, `
  `));
//# sourceMappingURL=enums.test.js.map