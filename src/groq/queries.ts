import { groq } from 'next-sanity';

/**
 * All the profile details for the website
 * Uses the most recent personalInfo document
 */
export const ProfileDetails = groq`
  *[_type == "personalInfo"] | order(_createdAt desc) {
    ...,
    "skills": skillTags[]->
  }[0]
`;
export const AllSocialLinks = groq`
  *[_type == "personalInfo"] | order(_updatedAt desc) [0].socialLinks
`;
export const AllCertificates = groq`
  *[_type == "certificate" && certificateHide == false] | order(startDate desc)
`;
export const AllProjectDetails = groq`
  *[_type == "project" && projectHide == false] | order(_updatedAt desc) {
    ...,
    "tags": categories[]->
  }
`;
export const AllCareers = groq`
  *[_type == "career" && careerHide == false] | order(startDate desc) {
    ...,
    "tags": skillTags[]->
  }
`;
export const ProjectConfig = groq`
  *[_type == "configuration"] | order(_updatedAt desc) [0]
`;
