import 'sanity';

declare module 'sanity' {
  interface BaseSchemaDefinition {
    /** Required for codegen */
    codegen?: { required: boolean };
  }
  interface FieldDefinitionBase {
    /** Required for codegen */
    codegen?: { required: boolean };
  }
}
