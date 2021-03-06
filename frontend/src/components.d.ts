/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MenuWithCategory } from "./components/utils/utils";
export namespace Components {
    interface ApiUi {
    }
    interface AppRoot {
    }
    interface CropTool {
        "AspectRatio": number;
        "CategoryId": number;
        "ImagePosition": any;
        "MaxWidth": number;
        "TargetId": number;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "url": string;
    }
    interface FontModal {
    }
    interface HomepageMenuComponent {
        "locationId": number;
        "menuId": number;
    }
    interface HomepageMenuEditorComponent {
        "locationId": number;
        "menuId": number;
    }
    interface LayoutOverlay {
    }
    interface MenuComponent {
        "menuId": number;
    }
    interface MenuEditorComponent {
        "UploadCatImage": (file: File, id: number) => Promise<void>;
        "deletedProdImg": (id: number, type?: 'Product' | 'Category') => Promise<void>;
        "menuId": number;
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
        "iconName": string;
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
        "menuId"?: number;
        "toggle": boolean;
        "uploadProdImage": (file: File, id: number, catId: number) => Promise<void>;
    }
    interface ToolbarComponent {
    }
}
export interface HomepageMenuComponentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLHomepageMenuComponentElement;
}
declare global {
    interface HTMLApiUiElement extends Components.ApiUi, HTMLStencilElement {
    }
    var HTMLApiUiElement: {
        prototype: HTMLApiUiElement;
        new (): HTMLApiUiElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLCropToolElement extends Components.CropTool, HTMLStencilElement {
    }
    var HTMLCropToolElement: {
        prototype: HTMLCropToolElement;
        new (): HTMLCropToolElement;
    };
    interface HTMLFontModalElement extends Components.FontModal, HTMLStencilElement {
    }
    var HTMLFontModalElement: {
        prototype: HTMLFontModalElement;
        new (): HTMLFontModalElement;
    };
    interface HTMLHomepageMenuComponentElement extends Components.HomepageMenuComponent, HTMLStencilElement {
    }
    var HTMLHomepageMenuComponentElement: {
        prototype: HTMLHomepageMenuComponentElement;
        new (): HTMLHomepageMenuComponentElement;
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
    interface HTMLMenuComponentElement extends Components.MenuComponent, HTMLStencilElement {
    }
    var HTMLMenuComponentElement: {
        prototype: HTMLMenuComponentElement;
        new (): HTMLMenuComponentElement;
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
        "app-root": HTMLAppRootElement;
        "crop-tool": HTMLCropToolElement;
        "font-modal": HTMLFontModalElement;
        "homepage-menu-component": HTMLHomepageMenuComponentElement;
        "homepage-menu-editor-component": HTMLHomepageMenuEditorComponentElement;
        "layout-overlay": HTMLLayoutOverlayElement;
        "menu-component": HTMLMenuComponentElement;
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
    interface AppRoot {
    }
    interface CropTool {
        "AspectRatio"?: number;
        "CategoryId"?: number;
        "ImagePosition"?: any;
        "MaxWidth"?: number;
        "TargetId"?: number;
        "format"?: "image/jpeg" | "image/jpg" | "image/png";
        "url"?: string;
    }
    interface FontModal {
    }
    interface HomepageMenuComponent {
        "locationId"?: number;
        "menuId"?: number;
        "onAccordionGroupRef"?: (event: HomepageMenuComponentCustomEvent<any>) => void;
    }
    interface HomepageMenuEditorComponent {
        "locationId"?: number;
        "menuId"?: number;
    }
    interface LayoutOverlay {
    }
    interface MenuComponent {
        "menuId"?: number;
    }
    interface MenuEditorComponent {
        "menuId"?: number;
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
        "iconName"?: string;
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
        "menuId"?: number;
        "toggle"?: boolean;
    }
    interface ToolbarComponent {
    }
    interface IntrinsicElements {
        "api-ui": ApiUi;
        "app-root": AppRoot;
        "crop-tool": CropTool;
        "font-modal": FontModal;
        "homepage-menu-component": HomepageMenuComponent;
        "homepage-menu-editor-component": HomepageMenuEditorComponent;
        "layout-overlay": LayoutOverlay;
        "menu-component": MenuComponent;
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
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "crop-tool": LocalJSX.CropTool & JSXBase.HTMLAttributes<HTMLCropToolElement>;
            "font-modal": LocalJSX.FontModal & JSXBase.HTMLAttributes<HTMLFontModalElement>;
            "homepage-menu-component": LocalJSX.HomepageMenuComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuComponentElement>;
            "homepage-menu-editor-component": LocalJSX.HomepageMenuEditorComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuEditorComponentElement>;
            "layout-overlay": LocalJSX.LayoutOverlay & JSXBase.HTMLAttributes<HTMLLayoutOverlayElement>;
            "menu-component": LocalJSX.MenuComponent & JSXBase.HTMLAttributes<HTMLMenuComponentElement>;
            "menu-editor-component": LocalJSX.MenuEditorComponent & JSXBase.HTMLAttributes<HTMLMenuEditorComponentElement>;
            "modal-ovelay": LocalJSX.ModalOvelay & JSXBase.HTMLAttributes<HTMLModalOvelayElement>;
            "schedule-overlay": LocalJSX.ScheduleOverlay & JSXBase.HTMLAttributes<HTMLScheduleOverlayElement>;
            "selector-component": LocalJSX.SelectorComponent & JSXBase.HTMLAttributes<HTMLSelectorComponentElement>;
            "test-menu": LocalJSX.TestMenu & JSXBase.HTMLAttributes<HTMLTestMenuElement>;
            "toolbar-component": LocalJSX.ToolbarComponent & JSXBase.HTMLAttributes<HTMLToolbarComponentElement>;
        }
    }
}
