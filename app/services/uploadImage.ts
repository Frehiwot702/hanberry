
export type uploadResponse = {
  secure_url: string;
  public_id: string;
}

export const uploadImage = async ( file: File ): Promise<uploadResponse> => {

    const formData = new FormData();

    formData.append( "file", file );

    formData.append( "upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

    return res.json();
};