// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const { resolve } = require('path');
const { rejects } = require('assert');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "make-runner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('make-runner.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let documentText = document.getText();
			let line = editor.selection.active.line;
			let texts = documentText.split('\n');
			let command = editor.document.lineAt(line).text.split(":")[0];
			if (!vscode.window.activeTerminal) {
				new Promise(function (resolve, reject) {
					let terminal = vscode.window.createTerminal()
					resolve(terminal)
				}).then(function (t) {
					t.show()
					t.sendText(`make -C ${path.dirname(editor.document.fileName)} ${command}`)
				})
			} else {
				vscode.window.activeTerminal.show()
				console.log(vscode.window.terminals)
				vscode.window.activeTerminal.sendText(`make -C ${path.dirname(editor.document.fileName)} ${command}`)
			}
		}
		//Display a message box to the user
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;
function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}
// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
