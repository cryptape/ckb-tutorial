// ./utils/docs.ts
export type Doc = {
  firstLevel: string;
  firstLevelText: string;
  secondLevels: {
    name: string;
    secondLevel: string;
    secondLevelText: string;
  }[];
};

const docs: Doc[] = [
  {
    "firstLevel": "/Onboarding",
    "firstLevelText": "Onboarding Tutorial",
    "secondLevels": [
      {
        "name": "Hello World",
        "secondLevel": "/HelloWorld",
        "secondLevelText": "Hello World"
      },
      {
        "name": "Multi-purpose NFT",
        "secondLevel": "/MultiNft",
        "secondLevelText": "Multi-purpose NFT"
      }
    ]
  },
  {
    "firstLevel": "/guides",
    "firstLevelText": "Guides",
    "secondLevels": [
      {
        "name": "Other Guides",
        "secondLevel": "/OtherTopics",
        "secondLevelText": "Other Guides"
      }
    ]
  },
  {
    "firstLevel": "/connection",
    "firstLevelText": "Connection",
    "secondLevels": [
      {
        "name": "Connection",
        "secondLevel": "/OtherConnection",
        "secondLevelText": "Other Connection"
      }
    ]
  }
];

export default docs;
