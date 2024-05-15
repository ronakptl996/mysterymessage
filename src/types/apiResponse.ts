import { IMessage } from "@/model/User";

export interface IApiResponse {
  success: boolean;
  message: string;
  isAccesptingMessages?: boolean;
  messages?: Array<IMessage>;
}
