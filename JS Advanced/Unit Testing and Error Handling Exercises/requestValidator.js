function solve(obj) {
    let valiedMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let uriRegEx = /^[\w\.]+$/m;
    let messageRegEx = /^[^<>\\&'"]*$/gm;

    if (!valiedMethods.includes(obj.method) || !obj.hasOwnProperty('method')) {
        throw new Error('Invalid request header: Invalid Method');
    }
    if (!uriRegEx.test(obj.uri) || !obj.hasOwnProperty('uri')) {
        if (obj.uri !== '*') {
            throw new Error('Invalid request header: Invalid URI');
        }
    }
    if (!validVersions.includes(obj.version) || !obj.hasOwnProperty('version')) {
        throw new Error('Invalid request header: Invalid Version');
    }
    if (!messageRegEx.test(obj.message) || !obj.hasOwnProperty('message')) {
        throw new Error('Invalid request header: Invalid Message');
    }
    return obj;
}

solve({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: '',
});
