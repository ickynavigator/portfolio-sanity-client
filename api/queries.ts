import { groq } from 'next-sanity';

const profileID = `"${process.env.PROFILE_ID}"`;

export const ProfileDetails = groq`
  *[_type == "personalInfo" && _id == ${profileID}][0]
`;
export const ProfileName = groq`
  *[_type == "personalInfo" && _id == ${profileID}]{
    name,
    id
  }[0]
`;
export const projectDetails = groq`
  *[_type == "project"]
`;
export const projectSlugs = groq`
  *[_type == "project"]{
    _id,
    "slug": slug.current
  }
`;

export default { ProfileDetails };
