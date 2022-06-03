export async function PostData(path: string, data: any) {
    try {
        const response = await fetch(path, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

export async function PostImage(path: string, data: any) {
    try {
        const response = await fetch(path, {
            method: 'post',
            body: data,
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}