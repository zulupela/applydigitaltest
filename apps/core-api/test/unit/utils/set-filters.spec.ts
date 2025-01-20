import { escapeLikeString, filterDict, setFilters } from '@core-api/utils/set-filters.util';
import {
  Equal,
  Not,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  In,
  ILike,
  Between,
  ArrayContains,
  IsNull
} from 'typeorm';

describe('setFilters - Util', () => {
  describe('escapeLikeString', () => {
    it('should escape % and _ characters with backslash', () => {
      const result = escapeLikeString('100%_test');
      expect(result).toBe('100\\%\\_test');
    });

    it('should return non-string values as is', () => {
      const result = escapeLikeString(123);
      expect(result).toBe(123);

      const resultNull = escapeLikeString(null);
      expect(resultNull).toBeNull();
    });
  });

  describe('filterDict', () => {
    it('should return the correct Equal operation', () => {
      const result = filterDict.eq('value');
      expect(result).toEqual(Equal('value'));
    });

    it('should return the correct Not operation', () => {
      const result = filterDict.neq('value');
      expect(result).toEqual(Not('value'));
    });

    it('should return the correct MoreThan operation', () => {
      const result = filterDict.gt(5);
      expect(result).toEqual(MoreThan(5));
    });

    it('should return the correct MoreThanOrEqual operation', () => {
      const result = filterDict.gte(5);
      expect(result).toEqual(MoreThanOrEqual(5));
    });

    it('should return the correct LessThan operation', () => {
      const result = filterDict.lt(5);
      expect(result).toEqual(LessThan(5));
    });

    it('should return the correct LessThanOrEqual operation', () => {
      const result = filterDict.lte(5);
      expect(result).toEqual(LessThanOrEqual(5));
    });

    it('should return the correct In operation', () => {
      const result = filterDict.in([1, 2, 3]);
      expect(result).toEqual(In([1, 2, 3]));
    });

    it('should return the correct ILike operation for contains', () => {
      const result = filterDict.contains('test');
      expect(result).toEqual(ILike('%test%'));
    });

    it('should return the correct ILike operation for startsWith', () => {
      const result = filterDict.startsWith('test');
      expect(result).toEqual(ILike('test%'));
    });

    it('should return the correct ILike operation for endsWith', () => {
      const result = filterDict.endsWith('test');
      expect(result).toEqual(ILike('%test'));
    });

    it('should return the correct Between operation', () => {
      const result = filterDict.between({ min: 1, max: 10 });
      expect(result).toEqual(Between(1, 10));
    });

    it('should return the correct ArrayContains operation', () => {
      const result = filterDict.arrayContains([1, 2, 3]);
      expect(result).toEqual(ArrayContains([1, 2, 3]));
    });

    it('should return the correct IsNull operation for true', () => {
      const result = filterDict.isNull('true');
      expect(result).toEqual(IsNull());
    });

    it('should return the correct Not(IsNull) operation for false', () => {
      const result = filterDict.isNull('false');
      expect(result).toEqual(Not(IsNull()));
    });
  });

  describe('setFilters', () => {
    let filter: Record<string, any>;

    beforeEach(() => {
      filter = {
        name: { eq: 'John' },
        age: { gt: 25 },
        address: {
          city: { eq: 'New York' },
          zipcode: { startsWith: '100' }
        },
        isActive: { neq: 'true' },
        createdAt: { between: { min: '2022-01-01', max: '2023-01-01' } }
      };
    });

    it('should apply the filters correctly for flat structure', () => {
      setFilters(filter, 10);
      expect(filter.name).toEqual(Equal('John'));
      expect(filter.age).toEqual(MoreThan(25));
    });

    it('should apply the filters correctly for nested structure', () => {
      setFilters(filter, 10);
      expect(filter.address.city).toEqual(Equal('New York'));
      expect(filter.address.zipcode).toEqual(ILike('100%'));
    });

    it('should apply the IsNull/Not(IsNull) filter correctly', () => {
      filter.isActive = { isNull: 'false' };
      setFilters(filter, 10);
      expect(filter.isActive).toEqual(Not(IsNull()));
    });

    it('should apply the Between filter correctly', () => {
      setFilters(filter, 10);
      expect(filter.createdAt).toEqual(Between('2022-01-01', '2023-01-01'));
    });

    it('should not recurse beyond the maxDepth', () => {
      setFilters(filter, 1);
      expect(filter.address.city).toEqual({ eq: 'New York' });
    });
  });
});
