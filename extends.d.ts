import 'sanity';

declare module 'sanity' {
  interface BaseSchemaDefinition {
    /** Required for codegen */
    codegen?: { required: boolean };
  }
}
