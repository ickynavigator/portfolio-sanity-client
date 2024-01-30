import { groq } from 'next-sanity';
import client from '../env/client.mjs';

const profileID = `"${client.NEXT_PUBLIC_PROFILE_ID}"`;

export const ProfileDetails = groq`
  *[_type == "personalInfo" && _id == ${profileID}]{
    ...,
    "skills": skillTags[]->
  }[0]
`;
export const AllSocialLinks = groq`
  *[_type == "personalInfo" && _id == ${profileID}]{
    socialLinks
  }[0].socialLinks`;
export const AllCertificates = groq`
  *[_type == "certificate" && certificateHide == false] | order(startDate desc)
`;
export const AllProjectDetails = groq`
  *[_type == "project" && projectHide == false]{
    ...,
    "tags": categories[]->
  } | order(_updatedAt desc)
`;
export const AllCareers = groq`
  *[_type == "career" && careerHide == false]{
    ...,
    "tags": skillTags[]->
  } | order(startDate desc)
`;
