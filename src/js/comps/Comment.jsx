import React,{ useContext }  from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { STATE } from '../modules/comment';
import style from '../../css/compCss/Comment.module.css';
import { storeContext } from "../hooks/context";
//{ (store.user.interactedComments.includes(commentData)) ? ( ((store.user.interactedComments.find(e => e === commentData).state) === STATE.upvote) ? commentData.upvote(store.user) : commentData.downvote(store.user) ) : ''}
const Comment = ({commentData}) => {
  const {uiStore, store} = useContext(storeContext);

  if(store.user.interactedComments.includes(commentData) && commentData.state === STATE.none) {
    if((store.user.interactedComments.find(e => e === commentData).state) === STATE.upvote)commentData.upvote(store.user) 
    else commentData.downvote(store.user)
  }
  return useObserver(() => (
    <div className={`${style.book__rightSide__messages__message} ${style[uiStore.themeClass]}`}>
          <p className={`${style.commentDatabook__rightSide__messages__message__user} ${style[uiStore.themeClass]}`}>{commentData.user.name}</p>
            <div className={`${style.book__rightSide__messages__message__bubble}  ${style[uiStore.themeClass]}`}>
              <p className={`${style.book__rightSide__messages__message__text} ${style[uiStore.themeClass]}`}>{commentData.content}</p>
              <p className={`${style.book__rightSide__messages__message__votes} ${style[uiStore.themeClass]}`}> 
                <span onClick={()=>commentData.upvote(store.user) } className={`${style.book__rightSide__messages__message__votes__upvote} ${commentData.state === STATE.upvote ? `${style.selectedUpvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.upvotes}</span> 
                <span onClick={()=>commentData.downvote(store.user) } className={`${style.book__rightSide__messages__message__votes__downvote} ${commentData.state === STATE.downvote ? `${style.selectedDownvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.downvotes}</span>
              </p>
            </div> 
    </div>
  ));
};

Comment.propTypes = {
  commentData: PropTypes.object.isRequired
};

export default Comment;
