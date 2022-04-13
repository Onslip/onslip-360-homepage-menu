import { PostData } from "../../../utils/post";
import { config } from "../../../utils/utils";

export async function LoadBackground(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            document.querySelector('body').style.backgroundImage = image
            config.background.enabled = false
            PostData('http://localhost:8080/config', config);

        }
    };
}

export async function LoadLogo(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            const img = document.createElement('img');
            const mainelement = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component');
            img.src = reader.result.toString();
            const a = mainelement.shadowRoot.querySelector(element);
            a.removeChild(a.childNodes[0]);
            mainelement.shadowRoot.querySelector(element).appendChild(img);
        }
    };
}
export async function LoadBanner(file, element) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const image = `url(${reader.result})`;
        if (image != null) {
            const mainelement = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component');
            mainelement.shadowRoot.querySelector(element).style.backgroundImage = image;
        }
    };
}