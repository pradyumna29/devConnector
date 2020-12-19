const isEmpty= value=> // arrow function with single retuen statement

        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length ===0) ||
        (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;