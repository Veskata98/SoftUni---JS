function extractEmails(input) {
    let emails = [];
    if (
        /(?<=\s)[A-Za-z0-9]+[\.|\-|\_]?[A-Za-z0-9]+\@([A-Za-z0-9]+[\-]?[A-Za-z0-9]+)(\.([A-Za-z]+[\-]?[A-Za-z0-9]+))+/g.test(
            input
        )
    ) {
        let tempMails = input.match(
            /(?<=\s)[A-Za-z0-9]+[\.|\-|\_]?[A-Za-z0-9]+\@([A-Za-z0-9]+[\-]?[A-Za-z0-9]+)(\.([A-Za-z]+[\-]?[A-Za-z0-9]+))+/g
        );
        emails.push(...tempMails);
    }
    console.log(emails.join('\n'));
}
