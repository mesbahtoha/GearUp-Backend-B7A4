const IMGBB_API_KEY = "9a79d6ed91ccdce28e5ba8c267cf98b8";

export async function uploadToImgBB(
  buffer: Buffer,
  mimetype: string,
): Promise<string> {
  const base64 = buffer.toString("base64");

  const params = new URLSearchParams();
  params.append("key", IMGBB_API_KEY);
  params.append("image", base64);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.error?.message || "Failed to upload image to ImgBB");
  }

  return data.data.url;
}
