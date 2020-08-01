import React from "react";
import Part from './Part';
import { CoursePart } from '../types';

interface PartProps {
  courseParts: {
    id: string;
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
  }[];
}

const Content: React.FC<PartProps> = (props) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.id} {...part as CoursePart} />
      ))}
    </div>
  );
};

export default Content;