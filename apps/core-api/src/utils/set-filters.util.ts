import {
  ArrayContains,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not
} from 'typeorm';

export const escapeLikeString = (parameter: string | unknown): string | unknown =>
  typeof parameter === 'string' ? parameter.replace(/[\\%_]/g, '\\$&') : parameter;

export const filterDict = {
  eq: (prop: unknown) => Equal(prop),
  neq: (prop: unknown) => Not(prop),
  gt: (prop: unknown) => MoreThan(prop),
  gte: (prop: unknown) => MoreThanOrEqual(prop),
  lt: (prop: unknown) => LessThan(prop),
  lte: (prop: unknown) => LessThanOrEqual(prop),
  in: (prop: unknown[]) => In(prop),
  contains: (prop: unknown) => ILike(`%${escapeLikeString(prop)}%`),
  startsWith: (prop: unknown) => ILike(`${escapeLikeString(prop)}%`),
  endsWith: (prop: unknown) => ILike(`%${escapeLikeString(prop)}`),
  between: ({ min, max }: { min: unknown; max: unknown }) => Between(min, max),
  arrayContains: (prop: unknown[]) => ArrayContains(prop),
  isNull: (prop: 'true' | 'false') => (prop === 'true' ? IsNull() : Not(IsNull()))
};

export function setFilters(filter: any, maxDepth: number, currentDepth = 0): void {
  if (!filter || currentDepth >= maxDepth) return;

  Object.keys(filter).forEach((property) => {
    if (filter[property] !== null && typeof filter[property] === 'object') {
      Object.keys(filter[property]).forEach((findOperator) => {
        if (findOperator in filterDict) {
          filter[property] = filterDict[findOperator as keyof typeof filterDict](filter[property][findOperator]);
        }
      });

      setFilters(filter[property], maxDepth, (currentDepth += 1));
    }
  });
}
