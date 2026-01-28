/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: churchevents
 * Interface for ChurchEvents
 */
export interface ChurchEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventTitle?: string;
  /** @wixFieldType datetime */
  eventDateTime?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
}


/**
 * Collection ID: historyeras
 * Interface for HistoryEras
 */
export interface HistoryEras {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eraTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  backgroundImage?: string;
  /** @wixFieldType number */
  order?: number;
  /** @wixFieldType number */
  startYear?: number;
  /** @wixFieldType number */
  endYear?: number;
}


/**
 * Collection ID: leadershipteam
 * Interface for LeadershipTeam
 */
export interface LeadershipTeam {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  leaderName?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  biography?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePhoto?: string;
  /** @wixFieldType boolean */
  isCurrent?: boolean;
}


/**
 * Collection ID: mediagallery
 * Interface for MediaGallery
 */
export interface MediaGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  mediaTitle?: string;
  /** @wixFieldType text */
  mediaType?: string;
  /** @wixFieldType url */
  mediaSource?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: ministries
 * Interface for Ministries
 */
export interface Ministries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  ministryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  scheduleInfo?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}


/**
 * Collection ID: timelinemilestones
 * Interface for TimelineMilestones
 */
export interface TimelineMilestones {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType date */
  milestoneDate?: Date | string;
  /** @wixFieldType text */
  milestoneTitle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  milestoneImage?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
}
