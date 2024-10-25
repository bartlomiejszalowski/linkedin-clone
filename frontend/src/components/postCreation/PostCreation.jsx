import { useState } from "react";
import { useCreatePost } from "../../hooks/useGetQueryActions";
import UploadImage from "./UploadImage";

const PostCreation = ({ user }) => {
  const [postContent, setPostContent] = useState({
    content: "",
    image: null,
    imagePreview: null,
  });

  const resetForm = () => {
    setPostContent({
      content: "",
      image: null,
      imagePreview: null,
    });
  };

  const { createPost, isPending } = useCreatePost(resetForm);

  const handlePostSubmit = async () => {
    try {
      const postData = {
        content: postContent.content,
      };

      if (postContent.image) {
        postData.image = postContent.image;
      }

      createPost(postData);
    } catch (error) {
      console.log("Error in handlePostSubmit:", error);
    }
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      readFileAsDataUrl(file).then((dataUrl) => {
        setPostContent({
          ...postContent,
          image: dataUrl,
          imagePreview: dataUrl,
        });
      });
    } else {
      setPostContent({
        ...postContent,
        imagePreview: null,
      });
    }
  };

  return (
    <div className="bg-secondary rounded-lg shadow mb-4 p-4">
      <div className="flex space-x-3">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="size-12 rounded-full"
        />
        <textarea
          className="w-full p-3 rounded-lg bg-base-100 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px]"
          placeholder="What's on your mind?"
          value={postContent.content}
          onChange={(e) =>
            setPostContent({ ...postContent, content: e.target.value })
          }
        />
      </div>
      {postContent.imagePreview && (
        <div className="mt-4">
          <img
            src={postContent.imagePreview}
            alt="Selected"
            className="w-full h-auto rouned-lg"
          />
        </div>
      )}

      <UploadImage
        onChange={handleChangeImage}
        handlePostCreation={handlePostSubmit}
        isPending={isPending}
      />
    </div>
  );
};

export default PostCreation;
