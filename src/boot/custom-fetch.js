export const customFetch = (url, opts = {}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(opts.method || 'get', url);

    for (let k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);

    xhr.onload = e =>
      resolve({
        ok: true,
        text: () => Promise.resolve(e.target.responseText),
        json: () => Promise.resolve(JSON.parse(e.target.responseText))
      });

    xhr.onerror = reject;

    if (xhr.upload)
      xhr.upload.onprogress = event =>
        console.log(`${(event.loaded / event.total) * 100}% uploaded`);

    xhr.send(opts.body);
  });
};
