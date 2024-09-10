import { defineQuery } from 'next-sanity';

/**
 * All the profile details for the website
 * Uses the most recent personalInfo document
 */
export const ProfileDetails = defineQuery(`
  *[_type == "personalInfo"] | order(_createdAt desc) {
    ...,
    "skills": skillTags[]->
  }[0]
`);
export const AllSocialLinks = defineQuery(`
  coalesce(*[_type == "personalInfo"] | order(_updatedAt desc) [0].socialLinks, [])
`);
export const AllCertificates = defineQuery(`
  *[_type == "certificate" && certificateHide == false] | order(startDate desc)
`);
export const AllProjectDetails = defineQuery(`
  *[_type == "project" && projectHide == false] | order(_updatedAt desc) {
    ...,
    "tags": categories[]->
  }
`);
export const AllCareers = defineQuery(`
  *[_type == "career" && careerHide == false] | order(startDate desc) {
    ...,
    "tags": skillTags[]->
  }
`);
export const ProjectConfig = defineQuery(`
  *[_type == "configuration"] | order(_updatedAt desc) [0]
`);
export const ProjectConfigName = defineQuery(`
  *[_type == "configuration"] | order(_updatedAt desc) [0].name
`);
export const ProjectInfoName = defineQuery(`
  *[_type == "personalInfo"] | order(_updatedAt desc) [0].name
`);
export const CVReference = defineQuery(`
  *[_type == "personalInfo"] | order(_updatedAt desc) [0].CV.asset._ref
`);
