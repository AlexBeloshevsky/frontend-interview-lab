export function debounced (fn: Function, delay: number) {
    let timer: ReturnType <typeof setTimeout>;

    return function debouncedFunction (...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}