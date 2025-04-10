/**
 * 钩子函数使用
 * const ns = useNameSpace();
 * ns.b() => block
 * ns.e(element) => block__element
 * ns.m(modifier) => block--modifier
 * ns.bem(element,modifier) => block__element--modifier
 */
interface UseNameSpaceReturn {
    b: () => string;
    e: (element: string) => string;
    m: (modifier: string) => string;
    bem: (_block?: string, element?: string, modifier?: string) => string;
}
export declare const useNameSpace: (block?: string) => UseNameSpaceReturn;
export {};
