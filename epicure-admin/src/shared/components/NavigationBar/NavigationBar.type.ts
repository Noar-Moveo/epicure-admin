export interface NavigationBarProps {
    collections: string[];
    handleListItemClick: (
      event: React.MouseEvent<HTMLDivElement>,
      index: string
    ) => void;
  }