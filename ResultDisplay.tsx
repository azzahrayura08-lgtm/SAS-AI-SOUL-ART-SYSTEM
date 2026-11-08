import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  Sparkles, 
  Share2, 
  Maximize2,
  Layers,
  Camera,
  ExternalLink
} from 'lucide-react';
import { GenerationResult } from '../types';

interface ResultDisplayProps {
  result: GenerationResult;
  onToggleFavorite: (id: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  onToggleFavorite,
  onCopyText,
}) => {
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopySection = (text: string, index: number, title: string) => {
    onCopyText(text, `Copied ${title}`);
    setCopiedSectionIndex(index);
    setTimeout(() => setCopiedSectionIndex(null), 2000);
  };

  const handleCopyAll = () => {
    let fullOutput = `${result.title}\n${result.subtitle}\n\n`;
    if (result.metadata.sections && result.metadata.sections.length > 0) {
      result.metadata.sections.forEach((sec) => {
        fullOutput += `### ${sec.title}\n${sec.body}\n\n`;
      });
    } else {
      fullOutput += result.content;
    }
    onCopyText(fullOutput, 'Copied full studio output');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    let content = `# ${result.title}\n_${result.subtitle}_\n\n`;
    content += `**Module:** ${result.moduleId.toUpperCase()} | **Generated:** ${new Date(result.timestamp).toLocaleString()}\n\n`;
    
    if (result.metadata.sections) {
      result.metadata.sections.forEach((s) => {
        content += `## ${s.title}\n\n${s.body}\n\n`;
      });
    } else {
      content += result.content;
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${result.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onCopyText('', 'Exported file: .md download ready');
  };

  return (
    <div className="bg-[#14131A] border border-[#E5AA9C]/25 rounded-2xl p-4 sm:p-6 shadow-2xl relative transition-all">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#FAF7F2]/10">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#DCD4CA]/70 mb-1">
            <span className="text-[#E5AA9C] font-semibold uppercase tracking-wider text-[11px]">
              {result.moduleId.replace('_', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {result.metadata.category && (
              <>
                <span aria-hidden="true">·</span>
                <span>{result.metadata.category}</span>
              </>
            )}
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF7F2] leading-tight">
            {result.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#DCD4CA]/80 mt-1 max-w-2xl">
            {result.subtitle}
          </p>
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={() => onToggleFavorite(result.id)}
            className={`min-h-[40px] px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
              result.isFavorite
                ? 'bg-[#B76E79]/20 border-[#E5AA9C] text-[#E5AA9C]'
                : 'bg-[#1C1A24] border-[#E5AA9C]/20 text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
            }`}
            title="Save to Favorites Vault"
          >
            {result.isFavorite ? <BookmarkCheck className="w-4 h-4 text-[#E5AA9C]" /> : <Bookmark className="w-4 h-4" />}
            <span className="hidden xs:inline">{result.isFavorite ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="min-h-[40px] px-3 py-1.5 bg-[#1C1A24] hover:bg-[#252230] border border-[#E5AA9C]/20 text-[#FAF7F2]/80 hover:text-[#FAF7F2] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Download as Markdown"
          >
            <Download className="w-4 h-4 text-[#FAF7F2]/70" />
            <span className="hidden xs:inline">Export</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="min-h-[40px] px-3.5 py-1.5 bg-gradient-to-r from-[#9A5A65] to-[#B76E79] hover:from-[#B76E79] hover:to-[#E5AA9C] text-[#FAF7F2] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            title="Copy everything"
          >
            {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Copied All!' : 'Copy All'}</span>
          </button>
        </div>
      </div>

      {/* Visual Preview Banner & Metadata Strip */}
      {result.previewImage && (
        <div className="my-5 relative rounded-xl overflow-hidden border border-[#E5AA9C]/25 group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-[#0C0C10] relative">
            <img 
              src={result.previewImage} 
              alt={result.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Contrast scrim following §1.F */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C10] via-black/30 to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <span className="bg-[#14131A]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/30 text-[11px] font-mono text-[#E5AA9C]">
                  Visual Mockup Prototype
                </span>
                {result.metadata.aspectRatio && (
                  <span className="hidden sm:inline bg-[#14131A]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#E5AA9C]/20 text-[11px] text-[#FAF7F2]/90">
                    {result.metadata.aspectRatio}
                  </span>
                )}
              </div>
              <button
                onClick={() => setImageModalOpen(true)}
                className="p-1.5 rounded-md bg-[#14131A]/80 text-[#FAF7F2] hover:text-[#E5AA9C] border border-[#E5AA9C]/20 backdrop-blur-md transition-colors"
                title="View full resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      {result.metadata.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
          {Object.entries(result.metadata.stats).map(([k, v]) => (
            <div key={k} className="p-3 bg-[#0C0C10]/60 border border-[#E5AA9C]/15 rounded-xl">
              <span className="text-[10px] uppercase tracking-wider text-[#DCD4CA]/60 block font-sans">{k}</span>
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#FAF7F2] mt-0.5 block tabular-nums">
                {v}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Main Formatted Sections */}
      <div className="space-y-4 mt-5">
        {result.metadata.sections && result.metadata.sections.length > 0 ? (
          result.metadata.sections.map((section, idx) => (
            <div 
              key={idx}
              className="bg-[#0C0C10]/80 border border-[#E5AA9C]/20 rounded-xl p-4 transition-all hover:border-[#E5AA9C]/40"
            >
              <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#FAF7F2]/10">
                <span className="font-serif text-sm sm:text-base font-semibold text-[#E5AA9C]">
                  {section.title}
                </span>
                <button
                  onClick={() => handleCopySection(section.body, idx, section.title)}
                  className="px-2.5 py-1 text-[11px] font-medium text-[#FAF7F2]/80 hover:text-[#FAF7F2] bg-[#1C1A24] hover:bg-[#252230] border border-[#E5AA9C]/20 rounded-md flex items-center gap-1.5 transition-colors"
                >
                  {copiedSectionIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#E5AA9C]" />
                      <span>Copy Section</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs sm:text-sm text-[#FAF7F2]/90 font-mono whitespace-pre-wrap leading-relaxed select-all">
                {section.body}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#0C0C10]/80 border border-[#E5AA9C]/20 rounded-xl p-4">
            <pre className="text-xs sm:text-sm text-[#FAF7F2]/90 font-mono whitespace-pre-wrap leading-relaxed select-all">
              {result.content}
            </pre>
          </div>
        )}
      </div>

      {/* Tags / Pill-Free Clean Metadata */}
      {result.metadata.tags && (
        <div className="mt-5 pt-4 border-t border-[#FAF7F2]/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#DCD4CA]/70 font-sans">
          <span className="text-[#E5AA9C] font-medium">Keywords:</span>
          {result.metadata.tags.map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="hover:text-[#FAF7F2] transition-colors">{tag}</span>
              {i < result.metadata.tags!.length - 1 && <span aria-hidden="true" className="text-[#FAF7F2]/20">·</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {imageModalOpen && result.previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 right-0 px-3 py-1.5 bg-[#1C1A24] text-[#FAF7F2] rounded-lg text-xs font-medium border border-[#E5AA9C]/30 hover:bg-[#252230]"
            >
              Close Preview (✕)
            </button>
            <img 
              src={result.previewImage} 
              alt={result.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-[#E5AA9C]/30 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
