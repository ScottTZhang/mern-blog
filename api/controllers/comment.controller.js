import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(errorHandler(403, "You can only comment on your own posts"));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id); //get the index of the userId in the like array
    if (userIndex === -1) {
      //if the userId is not in the like array, add it
      comment.likes.push(req.user.id);
      comment.numberOfLikes += 1;
      //console.log(comment.likes);
    } else {
      //if the userId is in the like array, remove it
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes -= 1;
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.log(error.message);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to edit this comment.")
      );
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true } // return the updated comment
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not allowed to delete this comment.")
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  if(!req.user.isAdmin)
    return next(errorHandler(403, "You are not allowed to access this resource."));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = 9; // Number of comments to fetch per request
    const sortDirection = req.query.sort === 'desc' ? -1 : 1; // Default to ascending order
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection }) // Sort by creation date, newest first
      .skip(startIndex) // Skip the comments already fetched
      .limit(limit); // Limit the number of comments fetched
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthComments = await Comment.countDocuments({ createdAt: { $gte: oneMonthAgo } });
    res.status(200).json({comments, totalComments, lastMonthComments});
  } catch (error) {
    next(error);
  }
}