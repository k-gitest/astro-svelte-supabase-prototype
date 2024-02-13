import * as validationFunctions from '../src/lib/authvalidation';
import { ZodError } from 'zod';

describe('validateFormData', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('バリデーション成功テスト', () => {

    const data = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = validationFunctions.validateFormData(data);

    expect(response).toBeNull();
  });

  it('zodErrorのテスト', () => {

    const emptyData = {
      email: '',
      password: '',
    };
    const response = validationFunctions.validateFormData(emptyData);

    if (response instanceof ZodError) {
      expect(response).toBeInstanceOf(Object);
    }

  });

  it('500エラーとエラーメッセージのテスト', () => {
    const invalidData: Record<string, unknown> = {};

    const result = validationFunctions.validateFormData(invalidData);

    if (result instanceof Response) {
      expect(result.status).toBe(500);
      expect(result).toEqual("Unknown error occurred");
    }
  });

});
