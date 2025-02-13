"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialogcontent";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, MessageSquare } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Utility function to capitalize the first letter of a word
const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

// Defining the type of the categories object
interface Categories {
  fruits: string[];
  vegetables: string[];
  drinks: string[];
  llm: string[];
}

// The main Popup component
export default function Popup() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Explicitly typing categories to match the Categories interface
  const categories: Categories = {
    fruits: ["1", "2", "3", "4", "5"],
    vegetables: ["6", "7", "8", "9", "10"],
    drinks: ["11", "12", "13", "14", "15"],
    llm: ["GPT 4", "GPT 3.5"],
  };

  useEffect(() => {
    // Open dialog when navigating to /tracer
    if (pathname === '/tracer') {
      setIsOpen(true);
    }
  }, [pathname]);

  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    // Redirect to /editor when dialog is closed
    if (!isOpen) {
      router.back();
    }
  };

  // Render Select components dynamically based on category data
  const renderSelect = (category: keyof Categories, label: string) => (
    <Select>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {categories[category].map((item) => (
            <SelectItem key={item} value={item}>
              {capitalize(item)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex text-2xl gap-2"><Search /> Workflows</DialogTitle>
          <Separator className="my-4 bg-black" />
          <DialogDescription />
        </DialogHeader>

        <div className="w-5/12 grid grid-cols-3 px-4 py-4">
          {/* Render select inputs for fruits, vegetables, and drinks */}
          {renderSelect("fruits", "Where")}
          {renderSelect("vegetables", "When")}
          {renderSelect("drinks", "Size")}
        </div>

        <div className="flex justify-between bg-gray-200 rounded-md mx-4 px-4 py-1">
          <p className="flex gap-2"><MessageSquare /> Q&A: <span className="font-bold">Workflows</span></p>
          <Select>
            <SelectTrigger className="w-[100px] h-[25px]">
              <SelectValue placeholder="GPT 4" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>LLM</SelectLabel>
                {categories.llm.map((llm) => (
                  <SelectItem key={llm} value={llm}>
                    {capitalize(llm)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="min-h-[400px] max-h-[400px]" />
        
        <Separator className="bg-black" />
        <DialogFooter className="flex sm:justify-start text-sm">Tracer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
