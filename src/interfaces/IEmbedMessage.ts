export interface ExampleEmbed {
    color?: number;
    title?: string;
    url?: string;
    author?: {
      name?: string;
      icon_url?: string;
      url?: string;
    };
    description?: string;
    thumbnail?: {
      url?: string;
    };
    fields?: {
      name?: string;
      value?: string;
      inline?: boolean;
    }[];
    image?: {
      url?: string;
    };
    timestamp?: string;
    footer?: {
      text?: string;
      icon_url?: string;
    };
  }