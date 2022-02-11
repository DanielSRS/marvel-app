export interface charactersProps {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: [
      {
        id: number;
        name: string;
        description: string;
        modified: Date;
        resourceURI: string;
        urls: [
          {
            type: string;
            url: string;
          },
        ];
        thumbnail: {
          path: string;
          extension: string;
        };
        comics: {
          available: number;
          returned: number;
          collectionURI: string;
          items: [
            {
              resourceURI: string;
              name: string;
            },
          ];
        };
        stories: {
          available: number;
          returned: number;
          collectionURI: string;
          items: [
            {
              resourceURI: string;
              name: string;
              type: string;
            },
          ];
        };
        events: {
          available: number;
          returned: number;
          collectionURI: string;
          items: [
            {
              resourceURI: string;
              name: string;
            },
          ];
        };
        series: {
          available: number;
          returned: number;
          collectionURI: string;
          items: [
            {
              resourceURI: string;
              name: string;
            },
          ];
        };
      },
    ];
  };
  etag: string;
}

export interface characterData {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: [
    {
      type: string;
      url: string;
    },
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: comics;
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        type: string;
      },
    ];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      },
    ];
  };
  series: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      },
    ];
  };
}

export type comics = {
  available: number;
  returned: number;
  collectionURI: string;
  items: [
    {
      resourceURI: string;
      name: string;
    },
  ];
};

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type maxResults = Range<1, 100>;

export type charactersParams = {
  limit?: maxResults;
  apikey?: string;
  ts?: string;
  hash?: string;
  name?: string;
  nameStartsWith?: string;
  modifiedSince?: Date;
  comics?: number;
  series?: number;
  events?: number;
  stories?: number;
  offset?: number;
};

export type comicByCharacterParams = {
  characterId: number;
  format?:
    | 'comic'
    | 'magazine'
    | 'trade paperback'
    | 'hardcover'
    | 'digest'
    | 'graphic novel'
    | 'digital comic'
    | 'infinit comic';
  formatType?: 'comic' | 'collection';
  noVariants?: Boolean;
};

export type ComicDataWrapper = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: [Comic];
  };
  etag: string;
};

export type Comic = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: [
    {
      type: string;
      language: string;
      text: string;
    },
  ];
  resourceURI: string;
  urls: [
    {
      type: string;
      url: string;
    },
  ];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: [
    {
      resourceURI: string;
      name: string;
    },
  ];
  collections: [
    {
      resourceURI: string;
      name: string;
    },
  ];
  collectedIssues: [
    {
      resourceURI: string;
      name: string;
    },
  ];
  dates: [
    {
      type: string;
      date: Date;
    },
  ];
  prices: [
    {
      type: string;
      price: number;
    },
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: [
    {
      path: string;
      extension: string;
    },
  ];
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [ComicCreatorsItem];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        role: string;
      },
    ];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
        type: string;
      },
    ];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: [
      {
        resourceURI: string;
        name: string;
      },
    ];
  };
};

export interface ComicCreatorsItem {
  resourceURI: string;
  name: string;
  role: string;
}
