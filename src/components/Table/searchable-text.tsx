// SearchableTextComponent.tsx
import React, { ReactNode } from "react";

interface SearchableTextProps {
  searchableText: string;
  children: ReactNode;
}

const SearchableTextComponent: React.FC<SearchableTextProps> = ({ searchableText, children }) => {
  return (
    <div data-searchable-text={searchableText}>
      {children}
    </div>
  );
};

export default SearchableTextComponent;
