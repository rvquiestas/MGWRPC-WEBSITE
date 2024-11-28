import { useMutation } from "react-query";
import { handlePostRating } from "../../../../services/rating.services";
import { notification } from "antd";

const usePostRating = () => {
  const postRating = useMutation(handlePostRating, {
    onSuccess: (data) => {
      notification.success({
        message: "Success",
        description: data.message,
      });
    },
  });
  return { postRating };
};

export default usePostRating;
