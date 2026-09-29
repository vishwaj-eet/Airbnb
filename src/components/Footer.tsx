import React from 'react';
import { Globe } from 'lucide-react';
import { ListingData } from '../types';

interface FooterProps {
  listing: ListingData;
  onOpenArchitecture: () => void;
}

export const Footer: React.FC<FooterProps> = ({ listing, onOpenArchitecture }) => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16 text-gray-700 text-sm">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-gray-200">
        <nav className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          <a href="#" className="hover:underline">Airbnb</a>
          <span>›</span>
          <a href="#" className="hover:underline">{listing.location.country}</a>
          <span>›</span>
          <a href="#" className="hover:underline">{listing.location.state}</a>
          <span>›</span>
          <a href="#" className="hover:underline">{listing.location.city}</a>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate max-w-xs">{listing.propertyName}</span>
        </nav>
      </div>

      {/* Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-bold text-gray-900 mb-3 text-sm">Support</h5>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">Help Centre</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 mb-3 text-sm">Hosting</h5>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 mb-3 text-sm">Airbnb</h5>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-[#FF385C] mb-3 text-sm">Project Deliverables</h5>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button
                onClick={onOpenArchitecture}
                className="hover:underline text-gray-900 font-semibold flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>📐 Scaling Architecture Diagram</span>
              </button>
            </li>
            <li>
              <a href="/architecture-diagram.svg" target="_blank" className="hover:underline text-gray-600">
                Download Architecture SVG
              </a>
            </li>
            <li>
              <span className="text-gray-500 text-xs">
                Take-Home Task by Playpower
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-gray-900">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </div>
            <span>₹ INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
