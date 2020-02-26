import React  from "react";
import { useObserver } from "mobx-react-lite";
import { STATE } from '../modules/comment';

const Comment = (props) => {
  
  const comment = props.commentData;
  const UIStore = props.uistore;
    
  return useObserver(() => (
    <div className={`book__rightSide__messages__message ${UIStore.themeClass}`}>
          <p className={`book__rightSide__messages__message--user ${UIStore.themeClass}`}>{comment.user.name}</p>
            <div className={`book__rightSide__messages__message--bubble  ${UIStore.themeClass}`}>
              <p className={`book__rightSide__messages__message--text ${UIStore.themeClass}`}>{comment.content}</p>
              <p className={`book__rightSide__messages__message__votes ${UIStore.themeClass}`}> 
                <span onClick={()=>comment.upvote() } className={`book__rightSide__messages__message__votes--upvote ${comment.state === STATE.upvote ? "selectedUpvote" : '' }`}>{comment.upvotes}</span> 
                <span onClick={()=>comment.downvote() } className={`book__rightSide__messages__message__votes--downvote ${comment.state === STATE.downvote ? "selectedDownvote" : '' }`}>{comment.downvotes}</span>
              </p>
            </div> 
    </div>
  ));
};

export default Comment;
