const get = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    // headers: { 'Content-Type': 'application/json' }
  });
  debugger
  const json = await response.json();
  return json;
}

export default get;