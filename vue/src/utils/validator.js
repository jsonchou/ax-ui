export default function (arr) {

    if (Array.isArray) {
        return (v) => {
            return arr.indexOf(v) > -1;
        }
    }

    return null;

}