/**
 * Used to expand types that have collapsed into named types to a full type.
 * @example
 * type Foo = { a: string; b: number };
 * type Bar = { c: boolean; d: string };
 * type Baz = Foo & Bar;
 * type ExpandedBaz = Prettify<Baz>;
 * //   ^? type ExpandedBaz = { a: string; b: number; c: boolean; d: string; }
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Returns the base schema type (without the sanity document)
 */
type DeEnhanced<D> = Omit<D, keyof import('sanity-codegen').SanityDocument>;
