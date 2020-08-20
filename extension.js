// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const  os = require('os');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var terminal
	let disposable = vscode.commands.registerCommand('make-runner.helloWorld', async function () {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			const filename = editor.document.fileName.split('/').pop()
			console.log(filename)
			const config = JSON.parse(fs.readFileSync(os.homedir() + "/.make-runner.json", 'utf-8'))
			const envs = Object.keys(config)
			vscode.window.showQuickPick(envs)
				.then((selection) => {
				if (!selection) {
					return
				}

				const env = config[selection]
				const exp = Object.keys(env).map(key => `${key}=${env[key]}`).join(' ')

				const line = editor.selection.active.line;
				const command = editor.document.lineAt(line).text.split(":")[0];
				const activeTerminal = vscode.window.activeTerminal
				if (terminal && !terminal.exitStatus) {
					terminal.show()
					terminal.sendText(`make -C ${path.dirname(editor.document.fileName)} ${command}`)
				} else {
					new Promise(function (resolve) {
						t = vscode.window.createTerminal()
						resolve(t)
					}).then(function (t) {
						terminal = t
						t.show()
						t.sendText(`make -C ${path.dirname(editor.document.fileName)} ${command}`)
					})
				}
			})
		}
	});
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
