export function CheckImage(file): boolean {
    if (file.size as number > 1024 * 1024) {
        alert('Välj en mindre fil')
        return false;
    }
    else {
        return true;
    }
}
