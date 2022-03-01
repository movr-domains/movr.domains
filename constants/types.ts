export interface DomainProps {
  id: string;
  name: string;
  labelName: string;
}

export interface TextRecords {
  url?: string;
  avatar?: string;
  email?: string;
  description?: string;
  notice?: string;
  keywords?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  reddit?: string;
  telegram?: string;
}

export interface DomainInfo {
  reverseRegistrant?: string;
  parent?: string;
  registrant?: string;
  controller?: string;
  expirationDate?: string;
  resolver?: string;
}
