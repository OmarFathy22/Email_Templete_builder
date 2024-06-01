const upload = async(file: File): Promise<string | undefined> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/docirki1d/image/upload", {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const jsonRes = await res.json();
    return jsonRes.url;
  } catch (error) {
    console.log("error");
  }
}

export default upload;