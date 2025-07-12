import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="e.g. How do I center a div in CSS?"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific and imagine you’re asking a question to another person
                </p>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  placeholder="Provide details about your problem. Include what you've tried and what you expect to happen..."
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'code'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link'],
                    ],
                  }}
                  className="min-h-[200px] rounded-t-md border"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include all the information someone would need to answer your question
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                  Tags
                </label>
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
          <div className="flex justify-end">
            <Button type="submit" variant="reddit">
              Submit Question
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AskQuestionPage;