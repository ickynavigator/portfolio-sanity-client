import { groq } from 'next-sanity';

const profileID = process.env.PROFILE_ID
  ? `"${process.env.PROFILE_ID}"`
  : `"b56b229e-dd1b-46e3-94ba-b077b79c4d24"`;

export const fetchProfile = groq`
  *[_type == "personalInfo" && _id == ${profileID}]{
    name,
    id
  }[0]
`;

export default { fetchProfile };
