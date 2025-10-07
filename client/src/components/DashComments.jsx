import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user); // For use user data
  console.log(currentUser);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true); //If the remaining posts are less than 9, makt it false, and the button will not show
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(""); // For deleting a comment

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        //console.log(data);
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false); // If the remaining posts are less than 9, makt it false, and the button will not show
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments(); // Call the function to fetch comments
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/user/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false); // If the remaining posts are less than 9, makt it false, and the button will not show
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false); //close the modal
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        ); // Remove the deleted comment from the list
        setShowModal(false); //close the modal
        setCommentIdToDelete(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <div>
          <Table hoverable="true" className="shadow-md">
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Number of Likes</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>UserId</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {comments.map((comment) => (
              <TableBody key={comment._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>{comment.userId}</TableCell>

                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <p>You have no comments yet.</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mx-auto mb-4 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" outline onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
