/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
import { DBcategory, DBproduct } from "./components/utils/utils";
export namespace Components {
    interface ApiUi {
        "closeIcon": string;
        "isopen": boolean;
    }
    interface CategoryComponent {
        "category": DBcategory;
    }
    interface CategoryEditorComponent {
        "category": DBcategory;
    }
    interface EditorVisualCheck {
    }
    interface HomepageMenuComponent {
    }
    interface HomepageMenuEditorComponent {
    }
    interface MenuComponent {
    }
    interface MenuEditorComponent {
    }
    interface ProductComponent {
        "product": DBproduct;
    }
    interface ProductEditorComponent {
        "product": DBproduct;
    }
    interface SelectorComponent {
        "DropDownvalues": string[];
        "IconName": string;
        "element": string;
        "type": string;
        "value": string;
    }
    interface ToolbarComponent {
    }
    interface UploadImageButton {
        "URL": string;
        "buttonvalue": string;
    }
}
declare global {
    interface HTMLApiUiElement extends Components.ApiUi, HTMLStencilElement {
    }
    var HTMLApiUiElement: {
        prototype: HTMLApiUiElement;
        new (): HTMLApiUiElement;
    };
    interface HTMLCategoryComponentElement extends Components.CategoryComponent, HTMLStencilElement {
    }
    var HTMLCategoryComponentElement: {
        prototype: HTMLCategoryComponentElement;
        new (): HTMLCategoryComponentElement;
    };
    interface HTMLCategoryEditorComponentElement extends Components.CategoryEditorComponent, HTMLStencilElement {
    }
    var HTMLCategoryEditorComponentElement: {
        prototype: HTMLCategoryEditorComponentElement;
        new (): HTMLCategoryEditorComponentElement;
    };
    interface HTMLEditorVisualCheckElement extends Components.EditorVisualCheck, HTMLStencilElement {
    }
    var HTMLEditorVisualCheckElement: {
        prototype: HTMLEditorVisualCheckElement;
        new (): HTMLEditorVisualCheckElement;
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
    interface HTMLProductComponentElement extends Components.ProductComponent, HTMLStencilElement {
    }
    var HTMLProductComponentElement: {
        prototype: HTMLProductComponentElement;
        new (): HTMLProductComponentElement;
    };
    interface HTMLProductEditorComponentElement extends Components.ProductEditorComponent, HTMLStencilElement {
    }
    var HTMLProductEditorComponentElement: {
        prototype: HTMLProductEditorComponentElement;
        new (): HTMLProductEditorComponentElement;
    };
    interface HTMLSelectorComponentElement extends Components.SelectorComponent, HTMLStencilElement {
    }
    var HTMLSelectorComponentElement: {
        prototype: HTMLSelectorComponentElement;
        new (): HTMLSelectorComponentElement;
    };
    interface HTMLToolbarComponentElement extends Components.ToolbarComponent, HTMLStencilElement {
    }
    var HTMLToolbarComponentElement: {
        prototype: HTMLToolbarComponentElement;
        new (): HTMLToolbarComponentElement;
    };
    interface HTMLUploadImageButtonElement extends Components.UploadImageButton, HTMLStencilElement {
    }
    var HTMLUploadImageButtonElement: {
        prototype: HTMLUploadImageButtonElement;
        new (): HTMLUploadImageButtonElement;
    };
    interface HTMLElementTagNameMap {
        "api-ui": HTMLApiUiElement;
        "category-component": HTMLCategoryComponentElement;
        "category-editor-component": HTMLCategoryEditorComponentElement;
        "editor-visual-check": HTMLEditorVisualCheckElement;
        "homepage-menu-component": HTMLHomepageMenuComponentElement;
        "homepage-menu-editor-component": HTMLHomepageMenuEditorComponentElement;
        "menu-component": HTMLMenuComponentElement;
        "menu-editor-component": HTMLMenuEditorComponentElement;
        "product-component": HTMLProductComponentElement;
        "product-editor-component": HTMLProductEditorComponentElement;
        "selector-component": HTMLSelectorComponentElement;
        "toolbar-component": HTMLToolbarComponentElement;
        "upload-image-button": HTMLUploadImageButtonElement;
    }
}
declare namespace LocalJSX {
    interface ApiUi {
        "closeIcon"?: string;
        "isopen"?: boolean;
    }
    interface CategoryComponent {
        "category"?: DBcategory;
    }
    interface CategoryEditorComponent {
        "category"?: DBcategory;
    }
    interface EditorVisualCheck {
    }
    interface HomepageMenuComponent {
    }
    interface HomepageMenuEditorComponent {
    }
    interface MenuComponent {
    }
    interface MenuEditorComponent {
    }
    interface ProductComponent {
        "product"?: DBproduct;
    }
    interface ProductEditorComponent {
        "product"?: DBproduct;
    }
    interface SelectorComponent {
        "DropDownvalues"?: string[];
        "IconName"?: string;
        "element"?: string;
        "type"?: string;
        "value"?: string;
    }
    interface ToolbarComponent {
    }
    interface UploadImageButton {
        "URL"?: string;
        "buttonvalue"?: string;
    }
    interface IntrinsicElements {
        "api-ui": ApiUi;
        "category-component": CategoryComponent;
        "category-editor-component": CategoryEditorComponent;
        "editor-visual-check": EditorVisualCheck;
        "homepage-menu-component": HomepageMenuComponent;
        "homepage-menu-editor-component": HomepageMenuEditorComponent;
        "menu-component": MenuComponent;
        "menu-editor-component": MenuEditorComponent;
        "product-component": ProductComponent;
        "product-editor-component": ProductEditorComponent;
        "selector-component": SelectorComponent;
        "toolbar-component": ToolbarComponent;
        "upload-image-button": UploadImageButton;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "api-ui": LocalJSX.ApiUi & JSXBase.HTMLAttributes<HTMLApiUiElement>;
            "category-component": LocalJSX.CategoryComponent & JSXBase.HTMLAttributes<HTMLCategoryComponentElement>;
            "category-editor-component": LocalJSX.CategoryEditorComponent & JSXBase.HTMLAttributes<HTMLCategoryEditorComponentElement>;
            "editor-visual-check": LocalJSX.EditorVisualCheck & JSXBase.HTMLAttributes<HTMLEditorVisualCheckElement>;
            "homepage-menu-component": LocalJSX.HomepageMenuComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuComponentElement>;
            "homepage-menu-editor-component": LocalJSX.HomepageMenuEditorComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuEditorComponentElement>;
            "menu-component": LocalJSX.MenuComponent & JSXBase.HTMLAttributes<HTMLMenuComponentElement>;
            "menu-editor-component": LocalJSX.MenuEditorComponent & JSXBase.HTMLAttributes<HTMLMenuEditorComponentElement>;
            "product-component": LocalJSX.ProductComponent & JSXBase.HTMLAttributes<HTMLProductComponentElement>;
            "product-editor-component": LocalJSX.ProductEditorComponent & JSXBase.HTMLAttributes<HTMLProductEditorComponentElement>;
            "selector-component": LocalJSX.SelectorComponent & JSXBase.HTMLAttributes<HTMLSelectorComponentElement>;
            "toolbar-component": LocalJSX.ToolbarComponent & JSXBase.HTMLAttributes<HTMLToolbarComponentElement>;
            "upload-image-button": LocalJSX.UploadImageButton & JSXBase.HTMLAttributes<HTMLUploadImageButtonElement>;
        }
    }
}