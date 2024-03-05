export const isJWT = (token) => {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.]+$/;
    return jwtRegex.test(token);
};

