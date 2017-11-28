export default function () {
    return (str, ...args) => {

        if (args.length === 1 && typeof args[0] === 'object') {
            args = args[0]
        }

        //check object type
        if (!args || !args.isPrototypeOf) {
            args = {};
        }

        return str.replace(RE_NARGS, (segment, p1, p2, offset) => {
            let result;
            if (str[offset - 1] === '{' && str[offset + segment.length] === '}') {
                return offset;
            } else {
                result = args.hasOwnProperty(p2) ? args[p2] : null;
                if (!result) {
                    return '';
                }
            }
            return result;
        })

    }
}