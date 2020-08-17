// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	var terminal
	let disposable = vscode.commands.registerCommand('make-runner.helloWorld', function () {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			let line = editor.selection.active.line;
			let command = editor.document.lineAt(line).text.split(":")[0];
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
