/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { location, MenuWithCategory } from "./components/utils/utils";
export namespace Components {
    interface ApiUi {
    }
    interface ContentComponent {
    }
    interface CropTool {
        "AspectRatio": number;
        "CategoryId": number;
        "ImagePosition": any;
        "MaxWidth": number;
        "TargetId": number;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "imageFile": File;
        "url": string;
    }
    interface EditorVisualCheck {
    }
    interface HomepageMenuEditorComponent {
    }
    interface LayoutOverlay {
    }
    interface MenuEditorComponent {
        "GetMenu": () => Promise<MenuWithCategory[]>;
        "GetMenuWithImages": () => Promise<MenuWithCategory>;
        "UploadCatImage": (file: File, id: number) => Promise<void>;
        "toggle": boolean;
        "uploadProdImage": (file: File, id: number, catId: number) => Promise<void>;
    }
    interface ModalOvelay {
        "AspectRatio": number;
        "CategoryId": number;
        "ImagePosition": string;
        "MaxWidth": number;
        "RenderType": string;
        "TargetId": number;
        "buttonClass": string;
        "buttonValue": string;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "url": string;
    }
    interface ScheduleOverlay {
    }
    interface SelectorComponent {
        "DisplayName": string;
        "DropDownvalues": any[];
        "IconName": string;
        "element": string;
        "type": string;
        "value": string;
    }
    interface TestMenu {
        "GetMenu": () => Promise<MenuWithCategory[]>;
        "GetMenuWithImages": () => Promise<MenuWithCategory>;
        "UploadCatImage": (file: File, id: number) => Promise<void>;
        "toggle": boolean;
        "uploadProdImage": (file: File, id: number, catId: number) => Promise<void>;
    }
    interface ToolbarComponent {
        "GetLocations": () => Promise<location[]>;
    }
}
declare global {
    interface HTMLApiUiElement extends Components.ApiUi, HTMLStencilElement {
    }
    var HTMLApiUiElement: {
        prototype: HTMLApiUiElement;
        new (): HTMLApiUiElement;
    };
    interface HTMLContentComponentElement extends Components.ContentComponent, HTMLStencilElement {
    }
    var HTMLContentComponentElement: {
        prototype: HTMLContentComponentElement;
        new (): HTMLContentComponentElement;
    };
    interface HTMLCropToolElement extends Components.CropTool, HTMLStencilElement {
    }
    var HTMLCropToolElement: {
        prototype: HTMLCropToolElement;
        new (): HTMLCropToolElement;
    };
    interface HTMLEditorVisualCheckElement extends Components.EditorVisualCheck, HTMLStencilElement {
    }
    var HTMLEditorVisualCheckElement: {
        prototype: HTMLEditorVisualCheckElement;
        new (): HTMLEditorVisualCheckElement;
    };
    interface HTMLHomepageMenuEditorComponentElement extends Components.HomepageMenuEditorComponent, HTMLStencilElement {
    }
    var HTMLHomepageMenuEditorComponentElement: {
        prototype: HTMLHomepageMenuEditorComponentElement;
        new (): HTMLHomepageMenuEditorComponentElement;
    };
    interface HTMLLayoutOverlayElement extends Components.LayoutOverlay, HTMLStencilElement {
    }
    var HTMLLayoutOverlayElement: {
        prototype: HTMLLayoutOverlayElement;
        new (): HTMLLayoutOverlayElement;
    };
    interface HTMLMenuEditorComponentElement extends Components.MenuEditorComponent, HTMLStencilElement {
    }
    var HTMLMenuEditorComponentElement: {
        prototype: HTMLMenuEditorComponentElement;
        new (): HTMLMenuEditorComponentElement;
    };
    interface HTMLModalOvelayElement extends Components.ModalOvelay, HTMLStencilElement {
    }
    var HTMLModalOvelayElement: {
        prototype: HTMLModalOvelayElement;
        new (): HTMLModalOvelayElement;
    };
    interface HTMLScheduleOverlayElement extends Components.ScheduleOverlay, HTMLStencilElement {
    }
    var HTMLScheduleOverlayElement: {
        prototype: HTMLScheduleOverlayElement;
        new (): HTMLScheduleOverlayElement;
    };
    interface HTMLSelectorComponentElement extends Components.SelectorComponent, HTMLStencilElement {
    }
    var HTMLSelectorComponentElement: {
        prototype: HTMLSelectorComponentElement;
        new (): HTMLSelectorComponentElement;
    };
    interface HTMLTestMenuElement extends Components.TestMenu, HTMLStencilElement {
    }
    var HTMLTestMenuElement: {
        prototype: HTMLTestMenuElement;
        new (): HTMLTestMenuElement;
    };
    interface HTMLToolbarComponentElement extends Components.ToolbarComponent, HTMLStencilElement {
    }
    var HTMLToolbarComponentElement: {
        prototype: HTMLToolbarComponentElement;
        new (): HTMLToolbarComponentElement;
    };
    interface HTMLElementTagNameMap {
        "api-ui": HTMLApiUiElement;
        "content-component": HTMLContentComponentElement;
        "crop-tool": HTMLCropToolElement;
        "editor-visual-check": HTMLEditorVisualCheckElement;
        "homepage-menu-editor-component": HTMLHomepageMenuEditorComponentElement;
        "layout-overlay": HTMLLayoutOverlayElement;
        "menu-editor-component": HTMLMenuEditorComponentElement;
        "modal-ovelay": HTMLModalOvelayElement;
        "schedule-overlay": HTMLScheduleOverlayElement;
        "selector-component": HTMLSelectorComponentElement;
        "test-menu": HTMLTestMenuElement;
        "toolbar-component": HTMLToolbarComponentElement;
    }
}
declare namespace LocalJSX {
    interface ApiUi {
    }
    interface ContentComponent {
    }
    interface CropTool {
        "AspectRatio"?: number;
        "CategoryId"?: number;
        "ImagePosition"?: any;
        "MaxWidth"?: number;
        "TargetId"?: number;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "imageFile"?: File;
        "url"?: string;
    }
    interface EditorVisualCheck {
    }
    interface HomepageMenuEditorComponent {
    }
    interface LayoutOverlay {
    }
    interface MenuEditorComponent {
        "toggle"?: boolean;
    }
    interface ModalOvelay {
        "AspectRatio"?: number;
        "CategoryId"?: number;
        "ImagePosition"?: string;
        "MaxWidth"?: number;
        "RenderType"?: string;
        "TargetId"?: number;
        "buttonClass"?: string;
        "buttonValue"?: string;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "url"?: string;
    }
    interface ScheduleOverlay {
    }
    interface SelectorComponent {
        "DisplayName"?: string;
        "DropDownvalues"?: any[];
        "IconName"?: string;
        "element"?: string;
        "type"?: string;
        "value"?: string;
    }
    interface TestMenu {
        "toggle"?: boolean;
    }
    interface ToolbarComponent {
    }
    interface IntrinsicElements {
        "api-ui": ApiUi;
        "content-component": ContentComponent;
        "crop-tool": CropTool;
        "editor-visual-check": EditorVisualCheck;
        "homepage-menu-editor-component": HomepageMenuEditorComponent;
        "layout-overlay": LayoutOverlay;
        "menu-editor-component": MenuEditorComponent;
        "modal-ovelay": ModalOvelay;
        "schedule-overlay": ScheduleOverlay;
        "selector-component": SelectorComponent;
        "test-menu": TestMenu;
        "toolbar-component": ToolbarComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "api-ui": LocalJSX.ApiUi & JSXBase.HTMLAttributes<HTMLApiUiElement>;
            "content-component": LocalJSX.ContentComponent & JSXBase.HTMLAttributes<HTMLContentComponentElement>;
            "crop-tool": LocalJSX.CropTool & JSXBase.HTMLAttributes<HTMLCropToolElement>;
            "editor-visual-check": LocalJSX.EditorVisualCheck & JSXBase.HTMLAttributes<HTMLEditorVisualCheckElement>;
            "homepage-menu-editor-component": LocalJSX.HomepageMenuEditorComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuEditorComponentElement>;
            "layout-overlay": LocalJSX.LayoutOverlay & JSXBase.HTMLAttributes<HTMLLayoutOverlayElement>;
            "menu-editor-component": LocalJSX.MenuEditorComponent & JSXBase.HTMLAttributes<HTMLMenuEditorComponentElement>;
            "modal-ovelay": LocalJSX.ModalOvelay & JSXBase.HTMLAttributes<HTMLModalOvelayElement>;
            "schedule-overlay": LocalJSX.ScheduleOverlay & JSXBase.HTMLAttributes<HTMLScheduleOverlayElement>;
            "selector-component": LocalJSX.SelectorComponent & JSXBase.HTMLAttributes<HTMLSelectorComponentElement>;
            "test-menu": LocalJSX.TestMenu & JSXBase.HTMLAttributes<HTMLTestMenuElement>;
            "toolbar-component": LocalJSX.ToolbarComponent & JSXBase.HTMLAttributes<HTMLToolbarComponentElement>;
        }
    }
}
