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
    if (data != null) {
        const byte = new Uint8Array(data.image.data)
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

}


// export async function loadProdImage(data) {
//     if (data != null) {
//         const byte = new Uint8Array(data.data)
//         const blob = new Blob([byte.buffer])
//         const reader = new FileReader()

//         return new Promise((resolve, reject) => {
//             reader.onerror = () => {
//                 reader.abort();
//                 reject(new DOMException("Problem parsing input file."));
//             };
//             reader.onload = () => {
//                 resolve(reader.result);
//             };
//             reader.readAsDataURL(blob);
//         });
//     }

// }