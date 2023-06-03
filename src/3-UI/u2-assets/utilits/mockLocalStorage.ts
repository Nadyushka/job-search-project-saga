interface LocalStorage {
    [key: string]: string;
}

const mock = (() => {
    let store: LocalStorage = {};
    return {
        getItem(key: string) {
            return store[key];
        },
        setItem(key: string, value: string | number) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        },
    };
})();

export default Object.defineProperty(window, 'localStorage', { value: mock });
