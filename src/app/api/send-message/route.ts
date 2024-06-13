import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { IMessage } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    // is user accepting the messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting a messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    user.messages.push(newMessage as IMessage);

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message send successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("error adding messages", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
