const Command = require('../src/command/command');

const cblockre = /(^```js)|(```$)/g;
class Eval extends Command {
	constructor() {
		super({ name:'eval', description:'evaluates an expression', usage:'[expression]',alias:['e'] });
	}

	/**
     *
     *
     * @param {*} message
     * @param {*} args
     * @memberof Eval
     */
    execute(message, args) {
        try {
            let content = args.join(' ');
            if (cblockre.test(content)) {
                content = content.replace(cblockre, '').trim();
            }
            let evaled = eval(content);
            if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
            const wrapped = `${message.author}\n\`\`\`js\n${evaled.length > 1800 ? evaled.slice(0, 1800) + '\n...' : evaled}\n\`\`\``;
            await message.channel.send(wrapped);
            console.log(evaled);
        }
        catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        }
	}
}

module.exports = HelpCommand;