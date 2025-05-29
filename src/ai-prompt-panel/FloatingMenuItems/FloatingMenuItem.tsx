import { v4 as uuidv4 } from 'uuid';
import { Environment } from '../types';
import { ParamsModal } from '../ParamsModal';
import { useState } from 'react';
import useAiPromptPanelState from '../_state/AiPromptPanelState';
import { AiPromptPanel } from '../AIPromptPanel';
import { Eta } from "eta"

export class FloatingMenuItem {
    id: string;
    label: string;
    icon: JSX.Element;
    trigger: string;
    editor: any;
    params: any;
    showParamsModal: boolean;
    template: string;
    deleteTriggerString: boolean;
    shouldWrapTemplate: boolean;
    wrapTemplateFunc: (activeMenuItem: FloatingMenuItem) => () => string;
    aiPromptPanel: typeof AiPromptPanel | undefined;    
    // action: (editor: any, activeMenuInfo: any) => void;



    constructor (){
        this.setId(uuidv4())
        this.setShowParamsModal(false)
        this.setDeleteTriggerString(true)
        this.shouldWrapTemplate = false;
        this.wrapTemplateFunc = this.originalWrapTemplateFunc;
    }


    private wrappedTemplate(activeMenuItem: FloatingMenuItem) {
        const html_ = `<a href="${activeMenuItem.template}" style="background-color: red; color: white;">${activeMenuItem.label}</a>`
        // const base64Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAAtJREFUCNdjYAAAAAIAAeXPdkAAAAAASUVORK5CYII=";

        // const html_with_image = `<img src="${base64Icon}" alt="icon" />`
        return html_
    }

    

    private originalWrapTemplateFunc(activeMenuItem: FloatingMenuItem) {
        return () => {
            if (activeMenuItem.shouldWrapTemplate) {
                return this.wrappedTemplate(activeMenuItem)
            } else {
                return activeMenuItem.template;
            }
        }
    }


    public wrapTemplate(wrapTemplateFunc: (activeMenuItem: FloatingMenuItem) => () => string) {
        this.wrapTemplateFunc = wrapTemplateFunc;
        return this;
    }

    public setShouldWrapTemplate(shouldWrapTemplate: boolean) {
        this.shouldWrapTemplate = shouldWrapTemplate;
        return this;
    }
    public getShouldWrapTemplate() {
        return this.shouldWrapTemplate;
    }
    public setDeleteTriggerString(deleteTriggerString: boolean) {
        this.deleteTriggerString = deleteTriggerString;
        return this;
    }
    public getDeleteTriggerString() {
        return this.deleteTriggerString;
    }
    public setTemplate(template: string) {
        this.template = template;
        return this;
    }
    public getTemplate() {
        return this.template;
    }
    
    public static instance(){
        return new FloatingMenuItem();
    }

    public setAiPromptPanel(aiPromptPanel: typeof AiPromptPanel | undefined) {
        this.aiPromptPanel = aiPromptPanel;
        return this;
    }

    public setTrigger(trigger: string) {
        this.trigger = trigger;
        return this;
    }
    public setEditor(editor: any) {
        this.editor = editor;
        return this;
    }

    public setId(id: string) {
        this.id = id;
        return this;
    }
    public setLabel(label: string) {
        this.label = label;
        return this;
    }
    public setIcon(icon: JSX.Element) {
        this.icon = icon;
        return this;
    }

    public setParams(params: Record<string, any> = {}) {
        this.params = params;
        return this;
    }
    public getParams() {
        return this.params;
    }
    public setShowParamsModal(showParamsModal: boolean) {
        this.showParamsModal = showParamsModal;
        return this;
    }
    public getShowParamsModal() {
        return this.showParamsModal;
    }
}



