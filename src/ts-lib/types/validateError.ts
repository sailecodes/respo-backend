export type ValidationError = {
  value?: string | undefined;
  property?: string;
  children?: unknown[];
  constraints?: unknown;
};
