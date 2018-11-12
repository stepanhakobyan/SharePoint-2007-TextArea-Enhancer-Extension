declare class nicEditor {
    constructor(config?: nicEditorConfig);
    panelInstance(a, b?);
    saveContent();
    setContent(htmlText: string);
    getContent(): string;
}

declare namespace nicEditors {
    export function findEditor(areaName: string): nicEditor;
    export function allTextAreas(): nicEditor[];
    //nicEditors.editors[]

    export type nicEditorButton = 'fontSize' | 'bold' | 'italic' | 'underline' | 'strikeThrough' | 'subscript' | 'superscript' | 'html' | 'image';
}

interface nicEditorConfig {
    fullPanel?: boolean;
    iconsPath?: string;
    buttonList?: nicEditors.nicEditorButton[];
    maxHeight?: number;
}

