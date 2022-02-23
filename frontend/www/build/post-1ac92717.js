async function PostData(URL, data) {
  try {
    const response = await fetch(URL, {
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
  }
  catch (err) {
    console.log(err);
  }
}
async function PostImage(URL, data) {
  try {
    const response = await fetch(URL, {
      method: 'post',
      body: data,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    console.log(response);
  }
  catch (err) {
    console.log(err);
  }
}

export { PostData as P, PostImage as a };
