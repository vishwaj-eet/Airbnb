import React, { useState } from 'react';
import { X, Copy, Check, Mail, MessageCircle, Share2, Code } from 'lucide-react';
import { ListingData } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, listing }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <h3 className="font-bold text-lg text-gray-900 text-center mb-6">
          Share this place
        </h3>

        {/* Property Mini Preview */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
          <img
            src={listing.photos[0].thumbnail}
            alt={listing.title}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{listing.title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              ★ {listing.overallRating.toFixed(2)} · {listing.location.city}, {listing.location.state}
            </p>
          </div>
        </div>

        {/* Share Channels Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all font-semibold text-sm text-gray-800 cursor-pointer"
          >
            {copied ? (
              <Check className="w-5 h-5 text-emerald-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-700" />
            )}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={`mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(
              `Check out this romantic stay in Candolim: ${currentUrl}`
            )}`}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all font-semibold text-sm text-gray-800"
          >
            <Mail className="w-5 h-5 text-gray-700" />
            <span>Email</span>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Check out this Airbnb in Goa: ${listing.title} - ${currentUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all font-semibold text-sm text-gray-800"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all font-semibold text-sm text-gray-800 cursor-pointer"
          >
            <Code className="w-5 h-5 text-gray-700" />
            <span>Embed</span>
          </button>
        </div>
      </div>
    </div>
  );
};
