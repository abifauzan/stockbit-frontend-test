// Check object length, return boolean
export const checkObjectLength = object => Object.keys(object).length > 0

export const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};