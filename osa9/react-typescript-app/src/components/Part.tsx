import React from "react";
import { assertNever } from "../utils";
import { CoursePart } from '../types';

const Part: React.FC<CoursePart> = (props) => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <div>
          <p>
            <strong>{props.name}</strong>
          </p>
          {props.description && (
            <p>
              <em>{props.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{props.exerciseCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <p>
            <strong>{props.name}</strong>
          </p>
          <p>
            Exercises: <strong>{props.exerciseCount}</strong>
          </p>
          <p>
            Group Projects: <strong>{props.groupProjectCount}</strong>
          </p>
          <hr />
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <p>
            <strong>{props.name}</strong>
          </p>
          {props.description && (
            <p>
              <em>{props.description}</em>
            </p>
          )}
          <p>
            Exercises: <strong>{props.exerciseCount}</strong>
          </p>
          <p>
            Submission Link:{" "}
            <a href={props.exerciseSubmissionLink}>
              {props.exerciseSubmissionLink}
            </a>
          </p>
          <hr />
        </div>
      );
    default:
      return assertNever(props);
  }
};

export default Part;