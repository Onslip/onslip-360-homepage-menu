export function deleteImage(path: string, id: number) {
    fetch(path, {
        method: 'delete',
        body: JSON.stringify(id),
    })
    console.log(JSON.stringify(id))
}