import { ClassConstructor, plainToClass } from 'class-transformer';

const isObject = (variable: unknown) =>
  typeof variable === 'object' &&
  variable !== null &&
  !Array.isArray(variable) &&
  variable.constructor === Object;

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const flattenObject = (
  object: Record<string, unknown>,
  posKey = '',
): Record<string, unknown> => {
  let transformed = {};

  Object.entries(object).forEach(([key, value]) => {
    if (isObject(value)) {
      transformed = {
        ...transformed,
        ...flattenObject(value as Record<string, unknown>, key),
      };
    } else if (Array.isArray(value)) {
      transformed = {
        ...transformed,
        [key]: value.map((el) => flattenObject(el)),
      };
    } else {
      const newKey = posKey.length === 0 ? key : `${posKey}${capitalize(key)}`;
      transformed = { ...transformed, [newKey]: value };
    }
  });

  return transformed;
};

export const transformTo = <T>(
  dto: ClassConstructor<T>,
  input: Record<string, unknown> | Array<Record<string, unknown>>,
) => {
  if (Array.isArray(input)) {
    return plainToClass(dto, {
      data: input.map((el) => flattenObject(el)),
    });
  }

  return plainToClass(dto, {
    data: flattenObject(input),
  });
};
