/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: consultations
 * Interface for Consultations
 */
export interface Consultations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType number */
  investmentAmount?: number;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: investorresources
 * Interface for InvestorResources
 */
export interface InvestorResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType url */
  externalUrl?: string;
}


/**
 * Collection ID: mutualfunds
 * Interface for MutualFunds
 */
export interface MutualFunds {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  xirr?: number;
  /** @wixFieldType text */
  managementType?: string;
  /** @wixFieldType text */
  subcategory?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  amc?: string;
  /** @wixFieldType text */
  fundName?: string;
  /** @wixFieldType text */
  fundDescription?: string;
  /** @wixFieldType text */
  fundType?: string;
  /** @wixFieldType text */
  riskLevel?: string;
  /** @wixFieldType number */
  minimumInvestment?: number;
  /** @wixFieldType text */
  fundManager?: string;
  /** @wixFieldType date */
  inceptionDate?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  fundLogo?: string;
  /** @wixFieldType url */
  factSheetUrl?: string;
}
