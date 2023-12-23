import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from 'sanity-codegen';

export type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
};

/**
 * Personal Info
 *
 *
 */
export interface PersonalInfo extends SanityDocument {
  _type: 'personalInfo';

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Show Job Status — `boolean`
   *
   *
   */
  jobVisibility: boolean;

  /**
   * Job Status — `string`
   *
   *
   */
  jobStatus: 'open' | 'inbetween' | 'close';

  /**
   * Curriculum Vitae — `file`
   *
   *
   */
  CV?: { _type: 'file'; asset: SanityReference<any> };

  /**
   * CV Last Updated at — `date`
   *
   *
   */
  CVLastUpdatedAt?: string;

  /**
   * Image — `image`
   *
   *
   */
  image: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Bio — `array`
   *
   *
   */
  bio: Array<SanityKeyed<SanityBlock>>;

  /**
   * Social Media — `array`
   *
   *
   */
  socialLinks?: Array<SanityKeyed<SocialLink>>;

  /**
   * Skills — `array`
   *
   *
   */
  skillTags?: Array<SanityKeyedReference<Category>>;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: 'project';

  /**
   * Hide Project — `boolean`
   *
   *
   */
  projectHide: boolean;

  /**
   * Project Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Body — `blockContent`
   *
   *
   */
  body: BlockContent;

  /**
   * Project URL — `urlWrapper`
   *
   *
   */
  projectUrl?: UrlWrapper;

  /**
   * Source URL — `urlWrapper`
   *
   *
   */
  sourceUrl?: UrlWrapper;

  /**
   * Project Issuer — `issuerWrapper`
   *
   *
   */
  projectIssuer?: IssuerWrapper;

  /**
   * External Authors — `array`
   *
   *
   */
  externalAuthors?: Array<SanityKeyedReference<Author>>;

  /**
   * Project Image — `image`
   *
   *
   */
  projectImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Profile Status — `string`
   *
   *
   */
  profileStatus: 'completed' | 'ongoing' | 'abandoned';
}

/**
 * Certificate
 *
 *
 */
export interface Certificate extends SanityDocument {
  _type: 'certificate';

  /**
   * Hide Certificate — `boolean`
   *
   *
   */
  certificateHide: boolean;

  /**
   * Certificate ID — `string`
   *
   *
   */
  idx: string;

  /**
   * Certificate Name — `string`
   *
   *
   */
  name: string;

  /**
   * Authority Name — `string`
   *
   *
   */
  authorityName: string;

  /**
   * Authority Image — `image`
   *
   *
   */
  authorityImage: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Certificate Start Date — `date`
   *
   *
   */
  startDate: string;

  /**
   * Certificate End Date — `date`
   *
   *
   */
  endDate?: string;

  /**
   * Certificate Link — `url`
   *
   *
   */
  certificateLink?: string;
}

/**
 * Contact Forms
 *
 *
 */
export interface ContactForms extends SanityDocument {
  _type: 'contactForms';

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Email — `string`
   *
   *
   */
  email?: string;

  /**
   * Message — `text`
   *
   *
   */
  message?: string;

  /**
   * Reviewed — `boolean`
   *
   *
   */
  reviewed?: boolean;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: 'category';

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: 'author';

  /**
   * Name — `string`
   *
   *
   */
  name: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug: { _type: 'slug'; current: string };

  /**
   * Github URL — `url`
   *
   *
   */
  githubUrl?: string;

  /**
   * Github Image — `image`
   *
   *
   */
  githubImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Career
 *
 *
 */
export interface Career extends SanityDocument {
  _type: 'career';

  /**
   * Hide Career — `boolean`
   *
   *
   */
  careerHide: boolean;

  /**
   * Employment Type — `string`
   *
   *
   */
  employmentType:
    | 'Contract'
    | 'Self-employed'
    | 'Part-time'
    | 'Full-time'
    | 'Internship'
    | 'Apprenticeship'
    | 'Freelance';

  /**
   * Title — `string`
   *
   *
   */
  title: string;

  /**
   * Company Name — `string`
   *
   *
   */
  name: string;

  /**
   * Location — `string`
   *
   *
   */
  location?: string;

  /**
   * Location Type — `string`
   *
   *
   */
  locationType: 'On-site' | 'Hybrid' | 'Remote';

  /**
   * Company Logo — `image`
   *
   *
   */
  companyLogo?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Start Date — `date`
   *
   *
   */
  startDate: string;

  /**
   * End Date — `date`
   *
   *
   */
  endDate?: string;

  /**
   * Description — `blockContent`
   *
   *
   */
  description: BlockContent;

  /**
   * Skills — `array`
   *
   *
   */
  skillTags: Array<SanityKeyedReference<Category>>;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image';
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type IssuerWrapper = {
  _type: 'issuerWrapper';
  /**
   * Issuer Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Issuer Link — `url`
   *
   *
   */
  link?: string;
};

export type SocialLink = {
  _type: 'socialLink';
  /**
   * Social Media Name — `string`
   *
   *
   */
  name: string;

  /**
   * Social Media Link — `string`
   *
   *
   */
  link: string;

  /**
   * react-icons icon name — `string`
   *
   *
   */
  iconName: string;
};

export type UrlWrapper = {
  _type: 'urlWrapper';
  /**
   * URL — `url`
   *
   *
   */
  url: string;

  /**
   * Hide URL — `boolean`
   *
   *
   */
  visibility?: boolean;
};

export type Documents =
  | PersonalInfo
  | Project
  | Certificate
  | ContactForms
  | Category
  | Author
  | Career;
