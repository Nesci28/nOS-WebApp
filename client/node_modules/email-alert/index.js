const os = require("os");
const assert = require("assert");
const Email = require("email").Email;
const htmlEscape = require("escape-html");

module.exports = {
    
    /*
        Buffers notification messages, then periodically sends an email
        containing all buffered notifications (if there are any). Intended
        for less important messages, such as new threads, or invalid
        authentication attempts.

        Defaults to sending notifications out every hour.
    */
    EmailNotifier: function (options) {

        // REVIEW: I don't actually know if this will work on Mac OS.
        assert.ok(os.type() == "Linux" || os.type() == "Darwin", "EmailAlert module only works on Linux or Mac OS.");

        validateOptionTypes(options, "EmailNotifier");
        validateOptionLengths(options, "EmailNotifier");
        validateOptionKeys(options, validNotifierOptionKeys);
        validateEmailAddresses(options, "EmailNotifier");
        validatePaths(options, "EmailNotifier");

        var notificationBuffer = [];

        var notificationInterval = setInterval(function () { 
            if (notificationBuffer.length > 0) sendEmail();
            notificationBuffer = [];
        }, options.notificationInterval * 1000 || 3600000);

        /**
         * This is the main function for appending notifications to the next email.
         */
        this.notify = function (message) {
            if (options.html) {
                notificationBuffer.push(htmlEscape(message));
            } else {
                notificationBuffer.push(message);
            }
        }

        function sendEmail () {
            (new Email({
                from: options.from || (os.userInfo().username + "@" + os.hostname()),
                replyTo: options.replyTo || null,
                to: options.to || (os.userInfo().username + "@" + os.hostname()),
                cc: options.cc || null,
                bcc: options.bcc || null,
                subject: options.subject || ("Notifications from " + os.hostname()),
                bodyType: (options.html ? "html" : "text/plain"),
                path: options.sendmailPath, // TODO: Implement some kind of validation here.
                body: generateBody(options.html),
                altText: (options.html ? generateBody(false) : null)
            })).send(function (err) {
                if (err) throw err;
            });
        }

        function generateBody(asHTML) {
            if (asHTML) {
                return (
                    (options.header || ("<h1>Notifications from " + os.hostname()) + "</h1>") + 
                    "<table><tbody><tr><td>" + notificationBuffer.join("</td></tr><tr><td>") + "</td></tr></tbody></table>" +
                    (options.footer || "") + "\n\n"
                );
            } else {
                return (
                    (options.header || ("Notifications from " + os.hostname()) + "\n\n") + 
                    notificationBuffer.join("\n") +
                    (options.footer || "") + "\n\n"
                );
            }
        }

    },

    /*
        Intended for more important emails. These get sent immediately.
    */
    EmailAlerter: function (options) {

        // REVIEW: I don't actually know if this will work on Mac OS.
        assert(os.type() == "Linux" || os.type() == "Darwin", "EmailAlert module only works on Linux or Mac OS.");
        validateOptionTypes(options, "EmailAlerter");
        validateOptionLengths(options, "EmailAlerter");
        validateOptionKeys(options, validAlerterOptionKeys);
        validateEmailAddresses(options, "EmailAlerter");
        validatePaths(options, "EmailAlerter");

        this.alert = function (message) {
            (new Email({
                from: options.from || (os.userInfo().username + "@" + os.hostname()),
                replyTo: options.replyTo || null,
                to: options.to || (os.userInfo().username + "@" + os.hostname()),
                cc: options.cc || null,
                bcc: options.bcc || null,
                subject: options.subject || ("URGENT ALERT from " + os.hostname()),
                bodyType: (options.html ? "html" : "text/plain"),
                path: options.sendmailPath, // TODO: Implement some kind of validation here.
                body: generateBody(options.html, message),
                altText: (options.html ? generateBody(false) : null)
            })).send(function (err) {
                if (err) throw err;
            });
        };

        function generateBody (asHTML, message) {
            if (asHTML) {
                return (
                    (options.header || ("<h1 style=\"color: red\">URGENT ALERT from " + os.hostname()) + "</h1>") + 
                    "<p>" + htmlEscape(message) + "</p>" +
                    (options.footer || "") + "\n\n"
                );
            } else {
                return (
                    (options.header || ("URGENT ALERT from " + os.hostname()) + "\n\n") + 
                    message +
                    (options.footer || "") + "\n\n"
                );
            }
        }

    }

}

function validateOptionTypes (options, type) {

    if (typeof(options) != "object")
            throw Error("You cannot configure a " + type + " with a non-object.");

    if (options.from && typeof(options.from) != "string")
        throw Error(type + ".from must be a string."); 

    if (options.replyTo && typeof(options.replyTo) != "string")
        throw Error(type + ".from must be a string.");

    if (
        options.to &&
        !Array.isArray(options.to) && 
        !options.to.every(function (element) { return (typeof(element) == "string"); })
    )
        throw Error(type + ".to must be an array of strings.");
        
    if (
        options.cc &&
        !Array.isArray(options.cc) && 
        !options.cc.every(function (element) { return (typeof(element) == "string"); })
    )
        throw Error(type + ".cc must be an array of strings.");

    if (
        options.bcc &&
        !Array.isArray(options.bcc) && 
        !options.bcc.every(function (element) { return (typeof(element) == "string"); })
    )
        throw Error(type + ".bcc must be an array of strings.");

    if (options.notificationInterval && typeof(options.notificationInterval) != "number")
        throw Error(type + ".notificationInterval must be a number.");

    if (options.subject && typeof(options.subject) != "string")
        throw Error(type + ".header must be a string.");

    if (options.header && typeof(options.header) != "string")
        throw Error(type + ".header must be a string.");

    if (options.footer && typeof(options.footer) != "string")
        throw Error(type + ".footer must be a string.");

    if (options.html && typeof(options.html) != "boolean")
        throw Error(type + ".html must be a boolean");

    if (options.sendmailPath && typeof(options.sendmailPath) != "string")
        throw Error(type + ".sendmailPath must be a string");

}

function validateOptionLengths (options, type) {

    if (options.from && options.from.length > 254)
        throw Error(type + ".from cannot be longer than 254 characters.");

    if (options.replyTo && options.replyTo.length > 254)
        throw Error(type + ".replyTo cannot be longer than 254 characters.");

    if (options.to && !options.to.every(function (element) { return (element.length <= 254); }))
        throw Error(type + ".to email addresses cannot be longer than 254 characters.");

    if (options.cc && !options.cc.every(function (element) { return (element.length <= 254); }))
        throw Error(type + ".cc email addresses cannot be longer than 254 characters.");

    if (options.bcc && !options.bcc.every(function (element) { return (element.length <= 254); }))
        throw Error(type + ".bcc email addresses cannot be longer than 254 characters.");

}

function validateEmailAddresses (options, type) {

    if (options.from && !validateEmailAddress(options.from))
        throw Error(type + ".from does not appear to be a valid email address.");

    if (options.replyTo && !validateEmailAddress(options.replyTo))
        throw Error(type + ".replyTo does not appear to be a valid email address.");

    if (options.to && !options.to.every(validateEmailAddress))
        throw Error(type + ".to appears to contain an invalid email address.");

    if (options.cc && !options.cc.every(validateEmailAddress))
        throw Error(type + ".cc appears to contain an invalid email address.");

    if (options.bcc && !options.bcc.every(validateEmailAddress))
        throw Error(type + ".bcc appears to contain an invalid email address.");

}

// REVIEW: Make this regex accept non-FQDNs, such as "localhost"
// https://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#201378
var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function validateEmailAddress (address) {
    var parts = address.split("@");
    return (
        // address.length <= 254 && // This is already done in an earlier step.
        emailRegex.test(address) &&
        parts.length == 2 &&
        parts[0].length <= 64 &&
        parts[1].split(".").every(function (dc) { return (dc.length <= 63); })
    );
}

function validatePaths (options, type) {

    if (options.sendmailPath && !validatePath(options.path))
        throw Error(type + ".sendmailPath is not a valid Unix path.");

}

function validatePath (path) {
    var pathParts = path.split("/");
    return (
        pathParts.length > 0 &&
        pathParts.every(function (part) { return (part.length < 255); }) &&
        pathParts.every(function (part) { return (part.indexOf("\x00") == -1); })
    );
}

const validAlerterOptionKeys =
    [ "from", "replyTo", "to", "cc", "bcc", "subject", "html", "header",
    "footer", "sendmailPath" ];

const validNotifierOptionKeys = 
    [ "from", "replyTo", "to", "cc", "bcc", "subject", "html", "header",
    "footer", "sendmailPath", "notificationInterval" ];

function validateOptionKeys (options, acceptableKeys) {
    return Object.keys(options).every(function (key) {
        return (acceptableKeys.indexOf(key) != -1);
    });
}