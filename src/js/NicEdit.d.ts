declare class nicEditor {
    constructor(a?);
    panelInstance(a, b?);
    saveContent();
    setContent(htmlText: string);
    getContent(): string;
}

declare namespace nicEditors {
    export function findEditor(areaName: string): nicEditor;
    export function allTextAreas(): nicEditor[];
    //nicEditors.editors[]
}



