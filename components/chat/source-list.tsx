import { Source } from '@/lib/types';
import { ExternalLinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Sources</h4>
      <div className="space-y-3">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded-md hover:bg-muted transition-colors"
          >
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                {source.favicon ? (
                  <img 
                    src={source.favicon} 
                    alt={source.siteName || source.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Replace with a fallback on error
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center rounded-full">
                    <span className="text-xs">{source.siteName?.[0] || source.title[0]}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium truncate">
                    {source.title}
                  </h4>
                  <ExternalLinkIcon className="h-3 w-3 ml-1 flex-shrink-0" />
                </div>
                
                {source.siteName && (
                  <Badge variant="outline" className="mt-1 px-1 py-0 h-4 text-[10px]">
                    {source.siteName}
                  </Badge>
                )}
                
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {source.snippet}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}