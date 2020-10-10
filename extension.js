// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
var ncp = require("copy-paste");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let runIt = vscode.commands.registerCommand('make-runner.runIt', async function () {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			const filename = editor.document.fileName.split('/').pop()
			if (filename.toLocaleLowerCase() !== 'makefile') {
				return
			}
			const config = vscode.workspace.getConfiguration().get('make-runner').env;;
			const envs = Object.keys(config);

			let env = {};
			if (envs.length !== 0) {
				const selection = await vscode.window.showQuickPick(envs);
				if (!selection) {
					return
				}
				env = config[selection];
			}

			if (typeof env !== 'object') {
				vscode.window.showErrorMessage('Make Runner config set properly.');
				return;
			}

			const exp = Object.keys(env).map(key => `${key}=${env[key]}`).join(' ');
			const line = editor.selection.active.line;
			const command = editor.document.lineAt(line).text.split(":")[0];
				const activeTerminal = vscode.window.activeTerminal

				if (activeTerminal) {
					activeTerminal.show()
					activeTerminal.sendText(`${exp} make -C ${path.dirname(editor.document.fileName)} ${command}`)
				} else {
					new Promise(function (resolve) {
						t = vscode.window.createTerminal()
						resolve(t)
					}).then(function (t) {
						t.show()
						t.sendText(`${exp} make -C ${path.dirname(editor.document.fileName)} ${command}`)
					})
				}
			})
		}
	});

	let copyIt = vscode.commands.registerCommand('make-runner.copyIt', async function () {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			const filename = editor.document.fileName.split('/').pop()
			if (filename.toLocaleLowerCase() !== 'makefile'){
				return
			}
			let config = ''
			try {
				config = JSON.parse(fs.readFileSync(os.homedir() + "/.make-runner.json", 'utf-8'))
			} catch (error) {
				vscode.window.showWarningMessage('Config not found')
			}
			const envs = Object.keys(config)
			vscode.window.showQuickPick(envs)
				.then((selection) => {
				if (!selection) {
					return;
				}

				const env = config[selection];
				const exp = Object.keys(env).map(key => `${key}=${env[key]}`).join(' ');
				const line = editor.selection.active.line;
				const command = editor.document.lineAt(line).text.split(":")[0];
				ncp.copy(`${exp} make -C ${path.dirname(editor.document.fileName)} ${command}`, function () {
					console.log('copy completed')
				})
			})
		}
	});

	context.subscriptions.push(copyIt, runIt);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
