# EmailAlert

This is a NodeJS module for Email Alerts and Notifications.

## Installation

From a command prompt with `npm` installed, type in `npm install email-alert`,
or `npm install --save email-alert` if you want to install this package and add
it to your `package.json` file.

## Usage

This module exposes constructors for two different objects: `EmailAlerter` and
EmailNotifier, both of which wrap the `email` NodeJS module. 

The `EmailAlerter` object exists essentially just for consistency. It takes a
configuration object as a parameter. If no configuration parameters are
provided, sensible defaults are chosen. Emails are sent immediately upon
invoking `EmailAlerter`'s `alert()` method. The `EmailAlerter` object is
intended to be used for important notifications requiring immediate action.

The `EmailNotifier` object is similar to the `EmailAlerter` object, but instead
of sending the email immediately, it queues messages in a buffer, and sends an
email every so often (the interval is configurable) containing all of the
updates. Messages are added to the queue with `EmailNotifier`'s `notify()`
method. The `EmailNotifier` object is intended to be used for less important
notifications.

## Configuration

The configuration object passed into the constructors of both the
`EmailAlerter` and the `EmailNotifier` take the following options, most of
which speak for themselves:

```javascript
{
    // The source address.
    // Defaults to (your username)@(your hostname).
    from: "one.email@address.only", 

    // The email address that should receive replies.
    // Defaults to null.
    replyTo: "one.email@address.only", 

    // The list of email addresses that should receive the alerts.
    // Defaults to [ (your username)@(your hostname) ]
    to: [ "list@of.email", "addresses@goes.here" ], 

    // The list of email addresses that should be CC'd the alerts.
    // Defaults to []
    cc: [ "list@of.email", "addresses@goes.here" ],

    // The list of email addresses that should be BCC'd the alerts.
    // Defaults to []
    bcc: [ "list@of.email", "addresses@goes.here" ],

    // The subject of the email that gets sent.
    // Defaults to "Notifications|Alert from (your hostname)"
    subject: "You have notifications!",

    // Whether to use HTML in the message.
    // Defaults to false
    html: true,

    // The Header that appears before the message of the alert or notifications
    // Defaults vary sensibly with HTML option and alert or notification.
    header: "<h1>You've got alerts!</h1>",

    // The Footer that appears before the message of the alert or notifications
    // Defaults vary sensibly with HTML option and alert or notification.
    footer: "<i>Copyright 2001 (C) A Odyssey</i>",

    // The length of time (in seconds) between which notification emails are sent
    // Note that no notification email is sent if there are no notifications.
    // Also note that this setting only applies to EmailNotifier.
    // Defaults to one hour (3600000 milliseconds)
    notificationInterval: 30,

    // The file path where sendmail can be found
    // Defaults to just "sendmail" and lets the shell do the digging.
    sendmailPath: "/usr/bin/sendmail"
}
```

## Examples

The simplest setup you can do:

```javascript
var ea = require("email-alert");

var emailAlerter = new ea.EmailAlerter({
    from: "alert@example.com",
    to: [ "t-rix@bucci.com" ]
});

var emailNotifier = new ea.EmailNotifier({
    from: "notifications@example.com",
    to: [ "nitro-dubs@bucci.com" ]
});

// Immediately sends an email to the configured destinations.
emailAlerter.alert("Memory usage is high!");

// Queues the following messages, then eventually sends them all in one email.
emailNotifier.notify("A user joined your channel.");
emailNotifier.notify("Backup taken at 4:04.");
emailNotifier.notify("Coffee is done brewing.");

```

## Todo

- [ ] Implement getters for all settings
- [ ] *Maybe* implement setters for all settings
- [ ] Implement assert.throws() tests
- [ ] Implement assert.doesNotThrow() tests

## Bugs

Currently, you may not use email addresses whose domain part contains only a
single component, such as `user@localhost`. I am working on it.

## Contact Me

If you would like to suggest fixes or improvements on this library, please just
comment on this on GitHub. If you would like to contact me for other reasons,
please email me at [jonathan@wilbur.space](mailto:jonathan@wilbur.space). :boar: