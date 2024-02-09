function getType(value) {
    switch (typeof value) {
        case 'number':
            return 'number';
        case 'string':
            return 'string';
        case 'object':
            if (Array.isArray(value)) {
                return 'array';
            } else {
                return 'object';
            }
        case 'boolean':
            return 'Boolean';
        default:
            return 'Unknown';
    }
}
module.exports = getType