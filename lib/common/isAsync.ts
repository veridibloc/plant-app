export function isAsync(func: Function): boolean {
    const returnType = func().constructor;
    return returnType.name === "Promise";
}