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
export const AllProjectDetails = groq`
  *[_type == "project" && projectHide == false]
`;
export const projectDetails = groq`
  *[_type == "project" && projectHide == false && slug.current == $slug][0]
`;
export const projectSlugs = groq`
  *[_type == "project" && projectHide == false]{
    _id,
    slug
  }
`;

export default { ProfileDetails };
