// app/api/delete-file/route.ts
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function DELETE(request: Request) {
  const { fileKey } = await request.json();

  if (!fileKey) {
    return Response.json({ error: "File key required" }, { status: 400 });
  }

  try {
    await utapi.deleteFiles([fileKey]);
    return Response.json({ success: true, deletedFileKey: fileKey });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Deletion failed" }, { status: 500 });
  }
}
