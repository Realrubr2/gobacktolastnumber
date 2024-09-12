// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.goToLastNumber', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const position = editor.selection.active;
            const lineText = document.lineAt(position.line).text;

            // Find the last number in the line
            const regex = /\d/g;
            let match;
            let lastMatch: RegExpExecArray | null = null;
            while ((match = regex.exec(lineText)) !== null) {
                lastMatch = match;
            }

            if (lastMatch) {
                const newPosition = new vscode.Position(position.line, lastMatch.index);
                editor.selection = new vscode.Selection(newPosition, newPosition);
                editor.revealRange(new vscode.Range(newPosition, newPosition));
            }
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
