async function uploadToS3(file, progress, error, options) {
  const matches = file.name.match(/\.([a-zA-Z0-9]+)$/);
  const extension = matches ? matches[1] : "txt";
  progress(5);
  const response = await fetch(options.uploadUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      extension,
      mime: file.type || "application/octet-stream"
    })
  });
  if (response.ok) {
    const { uploadUrl } = await response.json();
    progress(10);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.upload.addEventListener("progress", (e) =>
      progress(Math.round((e.loaded / e.total) * 90) + 10)
    );
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    try {
      await new Promise((resolve, reject) => {
        xhr.onload = (e) =>
          xhr.status - 200 < 100
            ? resolve()
            : reject(new Error("Failed to upload", e));
        xhr.onerror = (e) => reject(new Error("Failed to upload", e));
        xhr.send(file);
      });
      progress(100);
      const url = new URL(uploadUrl);
      return {
        url: `${url.protocol}//${url.host}${url.pathname}`,
        name: file.name,
        size: file.size
      };
    } catch {
      // we'll suppress this since we have a catch all error
    }
  }
  // Catch all error
  error("Sorry, we encountered an error when trying to upload your file.");
}

export default function (instance) {
  instance.extend({
    uploader: uploadToS3
  });
}
