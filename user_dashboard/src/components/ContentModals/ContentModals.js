import React from "react";

function iframe(ifr) {
    return {
      __html: ifr
    }
  }
export default (props) => (
    <React.Fragment>
    <a className="close" onClick={props.close}>
      &times;
    </a>
    <div dangerouslySetInnerHTML={iframe(props.contest.contentPost)}/>
    </React.Fragment>
);