import { ApiError } from "@/lib/api/client";
import { useNotice } from "@yamada-ui/react";

const useNotificationHandler = () => {
  const notice = useNotice({ isClosable: true });

  const handleSuccess = (message: string, title: string = "成功") => {
    notice({
      title,
      description: message,
      status: "success",
    });
  };

  const handleError = (error: unknown, title: string = "エラー") => {
    let errorMessage = "不明なエラーが発生しました";

    if (error instanceof ApiError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    notice({
      title,
      description: errorMessage,
      status: "error",
    });
  };

  const withNotification = async <T>(
    promise: Promise<T>,
    options: {
      successTitle?: string;
      successMessage?: string | ((data: T) => string);
      errorTitle?: string;
    } = {}
  ): Promise<T | undefined> => {
    try {
      const result = await promise;

      if (options.successMessage) {
        const message =
          typeof options.successMessage === "function"
            ? options.successMessage(result)
            : options.successMessage;

        handleSuccess(message, options.successTitle);
      }

      return result;
    } catch (error) {
      handleError(error, options.errorTitle);
      return undefined;
    }
  };

  return {
    handleSuccess,
    handleError,
    withNotification,
  };
};

export default useNotificationHandler;
