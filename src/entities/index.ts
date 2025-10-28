/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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
  /** @wixFieldType image */
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
  /** @wixFieldType image */
  fundLogo?: string;
  /** @wixFieldType url */
  factSheetUrl?: string;
}
