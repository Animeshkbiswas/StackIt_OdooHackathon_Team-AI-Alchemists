import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "newest", label: "Newest" },
  { id: "unanswered", label: "Unanswered" },
  { id: "votes", label: "Most Votes" },
  { id: "views", label: "Most Views" }
];

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* Desktop Filters */}
      <div className="hidden md:flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant="filter"
            size="sm"
            data-active={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="relative md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          {filters.find(f => f.id === activeFilter)?.label || "Filter"}
          <ChevronDown className="h-4 w-4" />
        </Button>
        
        {isOpen && (
          <div className="absolute top-full mt-1 left-0 bg-card border rounded-md shadow-stackit-lg z-10 min-w-[140px]">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors duration-200 first:rounded-t-md last:rounded-b-md ${
                  activeFilter === filter.id ? 'bg-stackit-blue text-white' : ''
                }`}
                onClick={() => {
                  onFilterChange(filter.id);
                  setIsOpen(false);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* More dropdown for additional filters */}
      <div className="relative">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          More
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};