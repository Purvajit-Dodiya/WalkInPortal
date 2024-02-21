export const typeDefs = `#graphql
    type UserCredentials {
    ID: ID!
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
  UserId: ID!
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
  college_id: ID!
  college_name: String!
  dt_created: String!
  dt_modified: String!
}

type EducationQualifications {
  id: ID!
  education_qualification: String!
  dt_created: String!
  dt_modified: String!
}

type Qualifications {
  UserId: ID!
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
  id: ID!
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
  listing_id: ID!
  listing_name: String!
  StartDate: String!
  EndDate: String!
  City: String!
  Venue: String!
  things_to_remember: String!
  dt_created: String!
  dt_modified: String!
  roles: [WalkinRoles!]!
  timeslots: [WalkinTimeSlots!]!
  additionalInformation: [AdditionalInformation!]!
}

type JobRoles {
  role_id: ID!
  role_name: String!
  role_description: String!
  role_requirements: String!
  gross_compensation: Int!
  dt_created: String!
  dt_modified: String!
}

type WalkinRoles {
  id: ID!
  listing_id: Int!
  role: JobRoles!
  dt_created: String!
  dt_modified: String!
}

type WalkinTimeSlots {
  id: ID!
  listing_id: Int!
  start_time: String!
  end_time: String!
  dt_created: String!
  dt_modified: String!
}

type AdditionalInformation {
  id: ID!
  listing_id: Int!
  information_heading: String!
  information: String!
  dt_created: String!
  dt_modified: String!
}

type UserApplication {
  ApplicationId: ID!
  listing_id: ID!
  user_id: Int!
  time_slot_id: Int!
  user_resume: String!
  dt_created: String!
  dt_modified: String!
  listing:WalkinListing
  timeslot:WalkinTimeSlots
  preferredRoles: [UserPreferredRoles]
}

type UserPreferredRoles {
  id: ID!
  application_id: Int!
  role_id: ID!
  role: JobRoles
  dt_created: String!
  dt_modified: String!
}

type Message{
  message: String
}

type AuthPayload {
    token: String
    email: String
  }

type Query {
  getColleges : [Colleges],
  getEducationQualifications : [EducationQualifications]
  getJobRole(roleId:Int!):JobRoles
  getWalkinListing(listingId: Int!): WalkinListing
  getAllWalkinListing : [WalkinListing]
  getWalkinTimeSlots(listingId: Int!) : [WalkinTimeSlots]
  getWalkinTimeSlot(id: Int!) : WalkinTimeSlots
  getAdditionalInformation(listingId: Int!) : [AdditionalInformation]
  getWalkinroles(listingId: Int!) : [WalkinRoles]
  getWalkinrole(id: Int!) : WalkinRoles
  getApplicationpreferredRoles(applicationId:ID!) : [UserPreferredRoles]
  getApplication(ApplicationId:ID!):UserApplication
  getHallTicket(email:String!, listingId:Int!):UserApplication
}

type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(input: RegisterInput!): UserDetails
    apply(input: ApplyInput!): Message
  }

  input RegisterInput {
    email: String!
    password: String!
    phoneNumber: String!
    firstName: String!
    lastName: String!
    resume: String
    profilePhoto: String
    portfolioURL: String
    preferredJobRole: [String]!
    haveReferral: Boolean!
    referralEmployeeName: String
    receiveUpdates: Boolean!
    aggregatePercentage: Int!
    passingYear: Int!
    educationQualification: ID!
    stream: String!
    collegeId: ID!
    collegeLocation: String!
    applicationType: String!
    appliedBefore: Boolean!
    roleApplied: String
    technologiesFamiliar: [String]!
    otherTechnologies: String
    yearsOfExperience: Int
    currentCTC: Int
    expectedCTC: Int
    technologiesExpertise: [String]!
    otherExpertiseTechnologies: String
    onNoticePeriod: Boolean!
    endDateOfNotice: String
    durationOfNoticePeriod: Int
  }

  input ApplyInput {
  email: String!
  listingId: ID!
  timeSlotId: ID!
  userResume: String!
  preferredRoles: [ID!]!
}

`;
