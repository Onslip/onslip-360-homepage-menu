/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DBcategory, DBproduct } from "./utils/utils";
export namespace Components {
    interface ApiUi {
        "closeIcon": string;
        "isopen": boolean;
    }
    interface CategoryComponent {
        "category": DBcategory;
    }
    interface CompanyBanner {
    }
    interface CompanyLogo {
        "closeIcon": string;
        "isopen": boolean;
    }
    interface HomepageMenuComponent {
    }
    interface ImageUploader {
    }
    interface ProductComponent {
        "product": DBproduct;
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
    interface HTMLCompanyBannerElement extends Components.CompanyBanner, HTMLStencilElement {
    }
    var HTMLCompanyBannerElement: {
        prototype: HTMLCompanyBannerElement;
        new (): HTMLCompanyBannerElement;
    };
    interface HTMLCompanyLogoElement extends Components.CompanyLogo, HTMLStencilElement {
    }
    var HTMLCompanyLogoElement: {
        prototype: HTMLCompanyLogoElement;
        new (): HTMLCompanyLogoElement;
    };
    interface HTMLHomepageMenuComponentElement extends Components.HomepageMenuComponent, HTMLStencilElement {
    }
    var HTMLHomepageMenuComponentElement: {
        prototype: HTMLHomepageMenuComponentElement;
        new (): HTMLHomepageMenuComponentElement;
    };
    interface HTMLImageUploaderElement extends Components.ImageUploader, HTMLStencilElement {
    }
    var HTMLImageUploaderElement: {
        prototype: HTMLImageUploaderElement;
        new (): HTMLImageUploaderElement;
    };
    interface HTMLProductComponentElement extends Components.ProductComponent, HTMLStencilElement {
    }
    var HTMLProductComponentElement: {
        prototype: HTMLProductComponentElement;
        new (): HTMLProductComponentElement;
    };
    interface HTMLElementTagNameMap {
        "api-ui": HTMLApiUiElement;
        "category-component": HTMLCategoryComponentElement;
        "company-banner": HTMLCompanyBannerElement;
        "company-logo": HTMLCompanyLogoElement;
        "homepage-menu-component": HTMLHomepageMenuComponentElement;
        "image-uploader": HTMLImageUploaderElement;
        "product-component": HTMLProductComponentElement;
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
    interface CompanyBanner {
    }
    interface CompanyLogo {
        "closeIcon"?: string;
        "isopen"?: boolean;
        "onOnUploadCompleted"?: (event: CustomEvent<Blob>) => void;
    }
    interface HomepageMenuComponent {
    }
    interface ImageUploader {
        "onOnUploadCompleted"?: (event: CustomEvent<Blob>) => void;
    }
    interface ProductComponent {
        "product"?: DBproduct;
    }
    interface IntrinsicElements {
        "api-ui": ApiUi;
        "category-component": CategoryComponent;
        "company-banner": CompanyBanner;
        "company-logo": CompanyLogo;
        "homepage-menu-component": HomepageMenuComponent;
        "image-uploader": ImageUploader;
        "product-component": ProductComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "api-ui": LocalJSX.ApiUi & JSXBase.HTMLAttributes<HTMLApiUiElement>;
            "category-component": LocalJSX.CategoryComponent & JSXBase.HTMLAttributes<HTMLCategoryComponentElement>;
            "company-banner": LocalJSX.CompanyBanner & JSXBase.HTMLAttributes<HTMLCompanyBannerElement>;
            "company-logo": LocalJSX.CompanyLogo & JSXBase.HTMLAttributes<HTMLCompanyLogoElement>;
            "homepage-menu-component": LocalJSX.HomepageMenuComponent & JSXBase.HTMLAttributes<HTMLHomepageMenuComponentElement>;
            "image-uploader": LocalJSX.ImageUploader & JSXBase.HTMLAttributes<HTMLImageUploaderElement>;
            "product-component": LocalJSX.ProductComponent & JSXBase.HTMLAttributes<HTMLProductComponentElement>;
        }
    }
}
