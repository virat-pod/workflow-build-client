import clientPromise from "@/lib/db/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const tokens = await db
      .collection("auth_verification_tokens")
      .deleteMany({ expires: { $lte: new Date() } });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todos = await db
      .collection("todos")
      .deleteMany({ completed: false, createdAt: { $lte: today } });

    return Response.json({
      success: true,
      tokensDeleted: tokens.deletedCount,
      tasksDeleted: todos.deletedCount,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}
