import clientPromise from "@/lib/db/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("auth_verification_tokens")
      .deleteMany({ expires: { $lte: new Date() } });

    return Response.json({ success: true, deleted: result.deletedCount });
  } catch (error) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}
