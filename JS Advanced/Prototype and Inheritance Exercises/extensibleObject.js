function extensibleObject() {
    const prototype = {};
    const obj = Object.create(prototype);
    obj.extend = function (template) {
        Object.entries(template).forEach((x) => {
            if (typeof x[1] !== 'function') {
                obj[x[0]] = x[1];
            } else {
                prototype[x[0]] = x[1];
            }
        });
    };
    return obj;
}

const myObj = extensibleObject();
const template = {
    extensionMethod: function () {},
    extensionProperty: 'someString',
};
myObj.extend(template);
console.log(myObj);
