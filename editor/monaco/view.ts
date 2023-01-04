import { OnInit, Input } from '@angular/core';
import { Service } from '@wiz/service/service';
import MonacoEditor from "@wiz/app/core.editor.monaco";
import toastr from "toastr";

export class Component implements OnInit {
    @Input() editor;

    public loading: boolean = true;
    public data: any = {};

    constructor(public service: Service) { }

    public async ngOnInit() {
        await this.loader(true);
        this.data = await this.editor.tab().data();
        await this.loader(false);
    }

    public async loader(status) {
        this.loading = status;
        await this.service.render();
    }

    private monacoRecommend() {
        const createTypescriptRecommend = (range) => {
            return [
                {
                    label: 'import.wiz.libs',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'import wiz libs',
                    insertText: '${1} from "\@wiz/libs/${2}";',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'import.wiz.libs.service',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'import wiz\/libs\/season\/service',
                    insertText: `{ Service } from "\@wiz/libs/season/service";`,
                    range,
                },
                {
                    label: 'wiz\.call',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'wiz\.call function',
                    insertText: 'const \{ code, data \} \= await wiz\.call("${1:apiName}", ${2});',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'wiz\.socket',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'wiz\.socket function',
                    insertText: 'const socketio \= wiz\.socket();',
                    range,
                },
                {
                    label: 'import.toastr',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'import toastr from "toastr";',
                    insertText: 'toastr from "toastr";',
                    range,
                },
                {
                    label: 'public.service',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'public service: Service,',
                    insertText: 'service\: Service,',
                    range,
                },
                {
                    label: 'public.change.detector.ref',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'public ref: ChangeDetectorRef,',
                    insertText: 'ref\: ChangeDetectorRef,',
                    range,
                },
                {
                    label: 'import.destructure',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'import destructured package',
                    insertText: '\{ ${1} \} from "${2}";',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'import.default',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'import default package',
                    insertText: '${1} from "${2}";',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
            ];
        }

        const createPugRecommend = (range) => {
            return [
                {
                    label: 'ngFor',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: '*ngFor custom snippet',
                    insertText: '\*ngFor="let ${1} of ${2};let i \= index"',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'ngIf',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: '*ngIf custom snippet',
                    insertText: '\*ngIf="${1}"',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: '[(ngModel)]',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'ngModel custom snippet',
                    insertText: '[(ngModel)]="${1}"',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: '(ngClick)',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'ngClick custom snippet',
                    insertText: '(click)="${1}"',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: '(ngChange)',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'ngChange custom snippet',
                    insertText: '(change)="${1}"',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'routerLink',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'insert text `routerLink=""`',
                    insertText: 'routerLink="${1}",${2}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'routerLinkVariable',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'insert text `[routerLink]=""`',
                    insertText: '[routerLink]="${1}",${2}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'routerLinkActive',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'insert text `routerLinkActive=""`',
                    insertText: 'routerLinkActive="${1}",${2}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
                {
                    label: 'routerLinkActiveVariable',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: 'insert text `[routerLinkActive]="",`',
                    insertText: '[routerLinkActive]="${1}",${2}',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range,
                },
            ];
        }

        monaco.languages.registerCompletionItemProvider('typescript', {
            provideCompletionItems: function (model, position) {
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                });
                const t = textUntilPosition.split("\n").slice(-1)[0];
                const wizmatch = t.match(/wiz/);
                const importmatch = t.match(/^import/);
                const publicmatch = t.match(/public/);
                if (!wizmatch && !importmatch && !publicmatch) {
                    return { suggestions: [] };
                }
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };
                return {
                    suggestions: createTypescriptRecommend(range),
                };
            }
        });
        monaco.languages.registerCompletionItemProvider('pug', {
            provideCompletionItems: function (model, position) {
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                });
                const t = textUntilPosition.split("\n").slice(-1)[0];
                const ngmatch = t.match(/ng/);
                const routermatch = t.match(/router/);
                if (!ngmatch && !routermatch) {
                    return { suggestions: [] };
                }
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };
                return {
                    suggestions: createPugRecommend(range),
                };
            }
        });
    }

    private async call(fn, data) {
        return await wiz.call("", data, { url: `/wiz/ide/api/workspace.app.explore/${fn}` });
    }

    private addComponentClick(editor) {
        // pug only
        if (this.editor.current !== 1) return;
        editor.onMouseDown(async ({ event, target }) => {
            const { metaKey, altKey } = event;
            if (!metaKey && !altKey) return;
            const text = target.element.textContent.replace(/\s/g, "");
            const r = /^wiz\-[a-z\-]+/.exec(text);
            if (!r) return;
            const appId = r[0].split("-").slice(1).join(".");
            const { code, data } = await wiz.call("load", { id: appId });
            if (code !== 200) return;

            const node = {
                editable: false,
                extended: false,
                isLoading: false,
                level: 1,
                meta: data,
                name: data.title,
                parent: {},
                path: `src/app/${appId}`,
                rename: data.title,
                type: "app",
            };

            let app = node.meta;
            let apppath = node.path;
            let mode = app.id.split(".")[0];

            let editor = this.service.editor.create({
                component_id: "workspace.app.explore",
                path: apppath,
                title: app.title ? app.title : app.namespace,
                subtitle: app.id,
                current: 1,
            });

            editor.namespace_prefix = mode + ".";

            let tabs: any = [
                editor.create({
                    name: 'Pug',
                    viewref: MonacoEditor,
                    path: node.path + "/view.pug",
                    config: { monaco: { language: 'pug' } }
                }),
                editor.create({
                    name: 'Component',
                    viewref: MonacoEditor,
                    path: node.path + "/view.ts",
                    config: { monaco: { language: 'typescript', renderValidationDecorations: 'off' } }
                }),
                editor.create({
                    name: 'SCSS',
                    viewref: MonacoEditor,
                    path: node.path + "/view.scss",
                    config: { monaco: { language: 'scss' } }
                }),
                editor.create({
                    name: 'API',
                    viewref: MonacoEditor,
                    path: node.path + "/api.py",
                    config: { monaco: { language: 'python' } }
                }),
                editor.create({
                    name: 'Socket',
                    viewref: MonacoEditor,
                    path: node.path + "/socket.py",
                    config: { monaco: { language: 'python' } }
                })
            ];

            for (let i = 0; i < tabs.length; i++) {
                tabs[i].bind('data', async (tab) => {
                    editor.meta.info = data;
                    const res = await this.call("read", {path: tab.path});
                    if (res.code != 200) return {};
                    return { data: res.data };
                }).bind('update', async (tab) => {
                    let data = await tab.data();
                    await this.update(tab.path, data.data);
                });
            }

            await editor.open(location);
            setTimeout(() => {
                Array.from(document.querySelectorAll(".editor-header")).slice(-1)[0].click();
            }, 100);
        });
    }

    public async init(e) {
        let editor = this.editor;
        for (let i = 0; i < this.service.shortcuts.length; i++) {
            let shortcut = this.service.shortcuts[i];
            e.editor.addCommand(shortcut.monaco, shortcut.command);
        }
        if (!window.monacoWIZRecommend) {
            this.monacoRecommend();
            window.monacoWIZRecommend = true;
        }
        this.addComponentClick(e.editor);

        editor.meta.monaco = e.editor;
        editor.meta.monaco.focus();
    }

    private async update(path: string, code: string) {
        let res = await this.call("update", {path, code});
        if (["route", "controller", "model", "config"].includes(path.split("/")[1])) {
            if (res.code == 200) toastr.info("Updated");
            return
        }

        if (res.code == 200) toastr.success("Updated");
        res = await this.call("build", {path});
        if (res.code == 200) toastr.info("Builded");
        else toastr.error("Error on build");
    }
}