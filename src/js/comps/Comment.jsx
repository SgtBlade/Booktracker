import React,{ useContext }  from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { STATE } from '../modules/comment';
import style from '../../css/compCss/Comment.module.css';
import { storeContext } from "../stores/context";

const Comment = ({commentData}) => {
  

  const {uiStore} = useContext(storeContext);
  return useObserver(() => (
    <div className={`${style.book__rightSide__messages__message} ${style[uiStore.themeClass]}`}>
          <p className={`${style.commentDatabook__rightSide__messages__message__user} ${style[uiStore.themeClass]}`}>{commentData.user.name}</p>
            <div className={`${style.book__rightSide__messages__message__bubble}  ${style[uiStore.themeClass]}`}>
              <p className={`${style.book__rightSide__messages__message__text} ${style[uiStore.themeClass]}`}>{commentData.content}</p>
              <p className={`${style.book__rightSide__messages__message__votes} ${style[uiStore.themeClass]}`}> 
                <span onClick={()=>commentData.upvote() } className={`${style.book__rightSide__messages__message__votes__upvote} ${commentData.state === STATE.upvote ? `${style.selectedUpvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.upvotes}</span> 
                <span onClick={()=>commentData.downvote() } className={`${style.book__rightSide__messages__message__votes__downvote} ${commentData.state === STATE.downvote ? `${style.selectedDownvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.downvotes}</span>
              </p>
            </div> 
    </div>
  ));
};

Comment.propTypes = {
  commentData: PropTypes.object.isRequired
};

export default Comment;
