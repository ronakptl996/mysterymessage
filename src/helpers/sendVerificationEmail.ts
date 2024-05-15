import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { IApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<IApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Mystry message | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error Sending verification Email >>", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
