export const getLocale = (pathname) => {
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "es") {
        return segments[1];
    }
    return "en";
}

export const redirectedPathName = (locale, pathName) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
};
