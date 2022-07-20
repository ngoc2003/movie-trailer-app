// export const Comments = () => {
//   return (
//     <>
//       <div
//         className="fb-comments"
//         data-href={"https://tl-movie.vercel.app/"}
//         data-width="100%"
//         data-numposts="5"
//       ></div>
//     </>
//   );
// }
import React, { Component} from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

export default class CommentsFb extends Component {
  render() {
    return (
      <FacebookProvider appId="3108322012762887">
        <Comments colorscheme='dark' width={'100%'} href="https://tl-movie.vercel.app/" />
      </FacebookProvider>
    );
  }
}
