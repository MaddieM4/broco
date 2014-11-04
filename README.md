broco
=====

Browser console, a pseudo-terminal for the browser that uses RequireJS and prototypes.

For a demo, see http://campadrenalin.github.io/broco/.

## AMD modules as commands

Broco commands are AMD/RequireJS modules. You can see good templates for how to do this in /src/modules/. Such a module should return a *class definition/constructor*, which will be instantiated with an instance of broco/logic/console.

The following attributes are considered special:

 * `_dir` - Filters the attributes that are visible for the "get" command. This allows modules to be serialized to JSON without getting into cyclic reference errors, since a lot of modules contain a reference to the console, which contains the modules object... etc.
 * `_help` - Array of lines to be used as static documentation information by the "help" command.
 * `process(args, response)` - A function that takes an argument array and a broco/ui/response object (think STDOUT).

## Available modules

While the downstream usefulness of broco is that you can write your own domain-specific modules, we provide some built-in, that you can choose to allow or disallow, defer loading, etc.

 * get - Retrieve a variable value stored by the console. Try `get .`!
 * set - Store a variable value. For fun and profit, try changing the 'motd' message and running the motd command again.
 * motd - Message of the Day. Very basic demo module that simply spits out some static text.
 * fullscreen - Bring the console into fullscreen mode, rather than being locked to an arbitrary height. Requires fullscreen.css.
 * help - Get documentation on stuff. You really should provide documentation on your custom modules: `help foo` is the idiomatic equivalent of `man foo` or `foo -h`.
 * load - Load more modules. API is a bit analogous to console.depend(). You don't have to load everything when you first hit the page! Optional features can be optionally used, even at the consumer level. Plus, if you do something hamhanded with the `set` command, you can reload broken modules and make them good-as-new.

## Missing features

Boy, this would be a long list if we were trying to be comprehensive (which is what issue trackers are for, ya turkey). But the highlights are:

 * Up and down arrows to seek through history of commands
 * Better themeing support (maybe use SASS to generate CSS?)
 * Tabs
 * Pipes / filtering
 * Output collapsing / ability to output multiple switcheable representations of an object

## Other notes

This is not stable software. The APIs are *incredibly* liable to change - in fact, the process() API will almost certainly have to change in some way to support piping and filtering. Build on broco at your own risk. However, long-term, it's exactly those builders that we want to empower and cheer on. So if you have a cool use for this software, the author(s) are here for you.

Feel free to contribute and bikeshed, if you care about the source, which you should. At some point I'll find a good way to add financial support to the project - tip4commit looked good until the entire FOSS ecosystem decided to crucify it, and I'd rather not sign up for a service that's about to die. Bitter? Me? Nawwwwww.
