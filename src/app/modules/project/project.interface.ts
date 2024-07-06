export type BadgeType = {
  title: string;
  link: string;
};

export type ProjectType = {
  title: string;
  description: string;
  imageSrc: string;
  badges: BadgeType[];
};
