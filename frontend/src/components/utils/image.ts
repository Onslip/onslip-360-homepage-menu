export function CheckImage(file): boolean {
    if (file.size as number > 1024 * 1024) {
        alert('Välj en mindre fil')
        return false;
    }
    else {
        return true;
    }
}

export async function loadImage(data) {
    const byte = new Uint8Array(await data.image.data)
    const blob = new Blob([byte.buffer])
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}