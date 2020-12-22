export default class TypeUtils {
  static arrayIsOfType(
    array: any,
    type:
      | "string"
      | "number"
      | "bigint"
      | "boolean"
      | "symbol"
      | "undefined"
      | "object"
      | "function"
  ): boolean {
    if (!Array.isArray(array)) return false;
    for (const element in array) {
      if (typeof element !== type) return false;
    }
    return true;
  }

  static getVariableName(object: any): string {
    return Object.keys(object)[0];
  }
}
