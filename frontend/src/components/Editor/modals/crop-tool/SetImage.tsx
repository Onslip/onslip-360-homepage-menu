import { PostData } from "../../../utils/post";
import { paths } from "../../../utils/urlPaths";
import { config } from "../../../utils/utils";

export async function LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            document.querySelector('body').style.backgroundImage = image
            config.background.enabled = false
            PostData(paths.config, config);
        }
    };
}

export async function LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            const mainelement = document.querySelector('app-root').querySelector('homepage-menu-editor-component');
            mainelement.shadowRoot.querySelector(element).querySelector('img').src = reader.result.toString();
        }
    };
}
export async function LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            const mainelement = document.querySelector('app-root').querySelector('homepage-menu-editor-component');
            mainelement.shadowRoot.querySelector(element).style.backgroundImage = image;
        }
    };
}