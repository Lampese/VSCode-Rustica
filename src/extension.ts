import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Rustica language extension is now active!");

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "rustica",
    {
      provideCompletionItems(
        _document: vscode.TextDocument,
        _position: vscode.Position
      ) {
        const completions = [
          new vscode.CompletionItem("fn", vscode.CompletionItemKind.Function),
          new vscode.CompletionItem("let", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("mut", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("if", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("else", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("while", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem(
            "return",
            vscode.CompletionItemKind.Keyword
          ),
          new vscode.CompletionItem("enum", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem(
            "effect",
            vscode.CompletionItemKind.Keyword
          ),
          new vscode.CompletionItem("match", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem("case", vscode.CompletionItemKind.Keyword),
          new vscode.CompletionItem(
            "handle",
            vscode.CompletionItemKind.Keyword
          ),
          new vscode.CompletionItem(
            "resume",
            vscode.CompletionItemKind.Keyword
          ),
          new vscode.CompletionItem("true", vscode.CompletionItemKind.Constant),
          new vscode.CompletionItem(
            "false",
            vscode.CompletionItemKind.Constant
          ),
        ];

        return completions;
      },
    }
  );

  const hoverProvider = vscode.languages.registerHoverProvider("rustica", {
    provideHover(document, position, _token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const hoverInfo: { [key: string]: string } = {
        fn: "Function declaration",
        let: "Variable declaration",
        mut: "Mutable variable",
        if: "Conditional statement",
        else: "Alternative branch",
        while: "Loop statement",
        return: "Return statement",
        enum: "Enumeration type",
        effect: "Effect declaration",
        match: "Pattern matching",
        case: "Pattern case",
        handle: "Effect handler",
        resume: "Resume effect",
        true: "Boolean true value",
        false: "Boolean false value",
      };

      if (hoverInfo[word]) {
        return new vscode.Hover(hoverInfo[word]);
      }
    },
  });

  context.subscriptions.push(completionProvider, hoverProvider);
}

export function deactivate() {
  console.log("Rustica language extension is now deactivated!");
}
