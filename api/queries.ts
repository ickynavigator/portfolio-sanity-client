import { groq } from 'next-sanity';

export const fetchProfile = groq`
  *[_type == "personalInfo"]{
    name
  }
`;

export default { fetchProfile };
