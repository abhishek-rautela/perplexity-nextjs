"use client";

import { useStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SearchFilters() {
  const { searchFilters, setSearchFilters } = useStore();
  
  const handleTimeRangeChange = (value: string) => {
    setSearchFilters({
      ...searchFilters,
      timeRange: value as 'all' | 'day' | 'week' | 'month' | 'year'
    });
  };
  
  const handleRegionChange = (value: string) => {
    setSearchFilters({
      ...searchFilters,
      region: value
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setSearchFilters({
      ...searchFilters,
      language: value
    });
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Time Range</Label>
        <RadioGroup 
          defaultValue={searchFilters.timeRange || 'all'}
          onValueChange={handleTimeRangeChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">All time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="day" id="day" />
            <Label htmlFor="day" className="cursor-pointer">Past day</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="week" />
            <Label htmlFor="week" className="cursor-pointer">Past week</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="month" />
            <Label htmlFor="month" className="cursor-pointer">Past month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="year" id="year" />
            <Label htmlFor="year" className="cursor-pointer">Past year</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Region</Label>
        <Select 
          defaultValue={searchFilters.region || 'us'}
          onValueChange={handleRegionChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Language</Label>
        <Select 
          defaultValue={searchFilters.language || 'en'}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}