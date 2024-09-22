import { httpsCallable } from "firebase/functions";
import { functions } from "../config";

interface ApiKeyResponse {
  apiKey: string;
  message: string;
}

interface ApiError {
  code: string;
  message: string;
}

export const generateApiKey = async (): Promise<ApiKeyResponse> => {
  const functionRef = httpsCallable<any, ApiKeyResponse>(
    functions,
    "generateApiKey"
  );

  try {
    const { data } = await functionRef();
    return data as ApiKeyResponse;
  } catch (error: any) {
    if (error.code && error.message) {
      const apiError: ApiError = {
        code: error.code,
        message: error.message,
      };
      console.error(
        `Error Code: ${apiError.code}, Message: ${apiError.message}`
      );
      throw apiError;
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
