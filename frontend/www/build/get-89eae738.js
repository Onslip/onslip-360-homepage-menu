async function GetData(URL) {
  return await fetch(URL)
    .then(rsp => rsp.json())
    .then(data => data = JSON.parse(JSON.stringify(data)));
}

export { GetData as G };
