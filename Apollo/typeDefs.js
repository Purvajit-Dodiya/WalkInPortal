export const typeDefs = `#graphql
    type UserCredentials {
    ID: Int!
    Email: String!
    Password: String!
    PhoneNumber: String!
    dt_created: String!
    dt_modified: String!
    userDetails: UserDetails
    qualifications: Qualifications
    userExperience: UserExperience
    }

type UserDetails {
  UserId: Int!
  FirstName: String!
  LastName: String!
  Resume: String!
  ProfilePhoto: String
  PortfolioURL: String
  PreferredJobRole: [String]!
  HaveReferral: Boolean!
  ReferralEmployeeName: String
  ReceiveUpdates: Boolean!
  dt_created: String!
  dt_modified: String!
  education: Qualifications
  userExperience: UserExperience
}

type Colleges {
  college_id: Int!
  college_name: String!
  dt_created: String!
  dt_modified: String!
}

type EducationQualifications {
  id: Int!
  education_qualification: String!
  dt_created: String!
  dt_modified: String!
}

type Qualifications {
  UserId: Int!
  AggregatePercentage: Int!
  PassingYear: Int!
  EducationQualification: EducationQualifications
  Stream: String!
  college: Colleges
  CollegeLocation: String!
  ApplicationType: String!
  AppliedBefore: Boolean!
  RoleApplied: String
  TechnologiesFamiliar: [String]!
  OtherTechnologies: String
  dt_created: String!
  dt_modified: String!
}

type UserExperience {
  id: Int!
  user_id: Int!
  YearsOfExperience: Int
  CurrentCTC: Int
  ExpectedCTC: Int
  TechnologiesExpertise: [String]!
  OtherExpertiseTechnologies: String
  OnNoticePeriod: Boolean!
  EndDateOfNotice: String
  DurationOfNoticePeriod: Int
  dt_created: String!
  dt_modified: String!
}

type WalkinListing {
  listing_id: Int
  listing_name: String
  StartDate: String
  EndDate: String
  City: String
  Venue: String
  things_to_remember: String
  dt_created: String
  dt_modified: String
  roles: [WalkinRoles]
  timeslots: [WalkinTimeSlots]
  additionalInformation: [AdditionalInformation]
}

type JobRoles {
  role_id: Int
  role_name: String
  role_description: String
  role_requirements: String
  gross_compensation: Int
  dt_created: String
  dt_modified: String
}

type WalkinRoles {
  id: Int
  listing_id: Int
  role: JobRoles
  dt_created: String
  dt_modified: String
}

type WalkinTimeSlots {
  id: Int
  listing_id: Int
  start_time: String
  end_time: String
  dt_created: String
  dt_modified: String
}

type AdditionalInformation {
  id: Int
  listing_id: Int
  information_heading: String
  information: String
  dt_created: String
  dt_modified: String
}

type UserApplication {
  ApplicationId: Int!
  listing_id: Int!
  user_id: Int!
  time_slot_id: Int!
  user_resume: String!
  dt_created: String!
  dt_modified: String!
  preferredRoles: [UserPreferredRoles]
}

type UserPreferredRoles {
  id: Int!
  application_id: Int!
  role: WalkinRoles
  dt_created: String!
  dt_modified: String!
}

type Query {
  getColleges : [Colleges],
  getJobRole(roleId:Int!):JobRoles
  getWalkinListing(listingId: Int!): WalkinListing
  getAllWalkinListing : [WalkinListing]
}

`;
