import React from "react";
import { useStores } from "../hooks/useStores";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { STATE } from '../models/comment';
import style from './css/compCss/Comment.module.css';
//{ (bookStore.user.interactedComments.includes(commentData)) ? ( ((bookStore.user.interactedComments.find(e => e === commentData).state) === STATE.upvote) ? commentData.upvote(bookStore.user) : commentData.downvote(bookStore.user) ) : ''}
const Comment = ({commentData}) => {
  const {uiStore, bookStore} = useStores();

  if(bookStore.user.interactedComments.includes(commentData) && commentData.state === STATE.none) {
    if((bookStore.user.interactedComments.find(e => e === commentData).state) === STATE.upvote)commentData.upvote(bookStore.user) 
    else commentData.downvote(bookStore.user)
  }
  return useObserver(() => (
    <div className={`${style.book__rightSide__messages__message} ${style[uiStore.themeClass]}`}>
          <p className={`${style.book__rightSide__messages__message__userName} ${style[uiStore.themeClass]}`}>{commentData.user.name}</p>
            <div className={`${style.book__rightSide__messages__message__bubble}  ${style[uiStore.themeClass]}`}>
              <p className={`${style.book__rightSide__messages__message__text} ${style[uiStore.themeClass]}`}>{commentData.content}</p>
              <p className={`${style.book__rightSide__messages__message__votes} ${style[uiStore.themeClass]}`}> 
                <span onClick={()=>{commentData.upvote(bookStore.user)} } className={`${style.book__rightSide__messages__message__votes__upvote} ${commentData.state === STATE.upvote ? `${style.selectedUpvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.upvotes}</span> 
                <span onClick={()=>{commentData.downvote(bookStore.user)} } className={`${style.book__rightSide__messages__message__votes__downvote} ${commentData.state === STATE.downvote ? `${style.selectedDownvote}` : '' } ${style[uiStore.themeClass]}`}>{commentData.downvotes}</span>
              </p>
            </div> 
    </div>
  ));
};

Comment.propTypes = {
  commentData: PropTypes.object.isRequired
};

export default Comment;
