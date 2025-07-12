import { ChevronUp, ChevronDown, MessageSquare, Eye, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    author: string;
    votes: number;
    answers: number;
    views: number;
    timeAgo: string;
    isAnswered?: boolean;
  };
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Card className="p-6 hover:shadow-stackit-md transition-all duration-200 hover:-translate-y-1 bg-gradient-card">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[60px]">
          <Button variant="vote" size="vote-icon">
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold text-foreground">{question.votes}</span>
          <Button variant="vote" size="vote-icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col items-center space-y-3 min-w-[80px] text-sm text-muted-foreground">
          <div className="flex flex-col items-center">
            <span className={`text-lg font-semibold ${question.isAnswered ? 'text-status-answered' : 'text-status-unanswered'}`}>
              {question.answers}
            </span>
            <span>answers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-foreground">{question.views}</span>
            <span>views</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <Link to={`/questions/${question.id}`} className="group">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-stackit-blue transition-colors duration-200 mb-2">
              {question.title}
            </h3>
          </Link>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {question.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-stackit-blue/10 text-stackit-blue hover:bg-stackit-blue hover:text-white cursor-pointer transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author and Time */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>{question.timeAgo}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>by</span>
              <Link to={`/users/${question.author}`} className="text-stackit-blue hover:underline font-medium">
                {question.author}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};