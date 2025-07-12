import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Bold, Italic, Code, List, Link as LinkIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AskQuestionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const navigate = useNavigate();

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = currentTag.trim().toLowerCase();
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log({ title, description, tags });
    // Navigate to the new question (mock ID)
    navigate("/questions/1");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link to="/" className="text-reddit-blue hover:underline">
            Questions
          </Link>
          <span className="mx-2 text-muted-foreground">&gt;</span>
          <span className="text-muted-foreground">Ask Question</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Ask a Question</h1>
          <p className="text-muted-foreground">
            Get help from our community of developers. Be specific and provide context.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's your programming question?"
                  className="w-full text-lg"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific and imagine you're asking a question to another person
                </p>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                
                {/* Rich Text Toolbar */}
                <div className="border border-border rounded-t-md bg-muted p-2 flex flex-wrap gap-1">
                  <Button variant="ghost" size="sm" type="button">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <Code className="h-4 w-4" />
                  </Button>
                  <div className="w-px bg-border mx-1" />
                  <Button variant="ghost" size="sm" type="button">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
                
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about your problem. Include what you've tried and what you expect to happen..."
                  className="min-h-[200px] rounded-t-none border-t-0 resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include all the information someone would need to answer your question
                </p>
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                  Tags
                </label>
                
                {/* Current Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-reddit-blue text-white flex items-center gap-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (press Enter or comma to add)"
                  className="w-full"
                  disabled={tags.length >= 5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Add up to 5 tags to describe your question (e.g., react, javascript, css)
                </p>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/">Cancel</Link>
            </Button>
            <Button 
              type="submit" 
              variant="reddit"
              disabled={!title.trim() || !description.trim() || tags.length === 0}
            >
              Submit Question
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AskQuestionPage;