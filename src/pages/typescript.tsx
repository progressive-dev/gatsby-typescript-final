import React from "react"
import { PageProps } from 'gatsby';

let city: 'London' | 'Paris' | 'New York';

const TypeScript: React.FC<PageProps> = ({
  location,
  pageContext
}) => {
  console.log('location', location);
  console.log('pageContext', pageContext);

  city = 'New York';
  console.log('city', city);
  return <div>Hello world!</div>
}

export default TypeScript;