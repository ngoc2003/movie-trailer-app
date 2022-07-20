import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';
import { REACT_APP_FACEBOOK_APP_ID } from '../config';

export default function CommentsFb ({url}) {
    return (
      <FacebookProvider appId={REACT_APP_FACEBOOK_APP_ID}>
        <Comments width={'100%'} href={url}/>
      </FacebookProvider>
    );
  
}
