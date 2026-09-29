import React, { useState } from 'react';
import { Award, ShieldCheck, Star, MessageSquare, Clock, Send, X } from 'lucide-react';
import { ListingData } from '../types';

interface HostSectionProps {
  host: ListingData['host'];
  overallRating: number;
  reviewCount: number;
}

export const HostSection: React.FC<HostSectionProps> = ({
  host,
  overallRating,
  reviewCount,
}) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setIsMessageModalOpen(false);
    }, 2000);
  };

  return (
    <div className="py-8 border-b border-gray-200">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-6">
        Meet your Host
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Host Profile Card */}
        <div className="border border-gray-200 rounded-3xl p-6 shadow-sm bg-white flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-24 h-24 rounded-full object-cover shadow-sm border border-gray-100"
            />
            {host.isSuperhost && (
              <div className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1.5 rounded-full border-2 border-white shadow-xs">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>

          <h4 className="text-xl font-bold text-gray-900">{host.name}</h4>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">Superhost</p>

          <div className="grid grid-cols-2 divide-x divide-gray-200 w-full mt-5 pt-4 border-t border-gray-100">
            <div>
              <div className="font-bold text-gray-900 text-lg">{reviewCount}</div>
              <div className="text-xs text-gray-500">Reviews</div>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg flex items-center justify-center gap-0.5">
                <span>{overallRating.toFixed(2)}</span>
                <Star className="w-3.5 h-3.5 fill-current text-gray-900" />
              </div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        {/* Host Details & Bio */}
        <div className="md:col-span-2 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-800">
              <Award className="w-5 h-5 text-gray-700" />
              <span>Superhost committed to providing extraordinary stays for guests.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-800">
              <Clock className="w-5 h-5 text-gray-700" />
              <span>Response rate: <strong>{host.responseRate}%</strong> · Responds <strong>{host.responseTime}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-800">
              <ShieldCheck className="w-5 h-5 text-gray-700" />
              <span>Identity verified & licensed hospitality provider in Goa.</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed pt-2">
            {host.bio}
          </p>

          {host.coHosts.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Co-Hosts</p>
              <div className="flex items-center gap-3">
                {host.coHosts.map((cohost, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={cohost.avatar}
                      alt={cohost.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-gray-800">{cohost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => setIsMessageModalOpen(true)}
              className="border border-gray-900 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg text-sm transition-colors cursor-pointer shadow-xs active:scale-[0.99] flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message Host</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img src={host.avatar} alt={host.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900">Message {host.name}</h4>
                <p className="text-xs text-gray-500">Typically responds within an hour</p>
              </div>
            </div>

            {messageSent ? (
              <div className="py-8 text-center text-emerald-600 font-semibold flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  ✓
                </div>
                <span>Your message has been sent to Mirashya Homes!</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your inquiry
                  </label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Hi Mirashya, I am interested in booking Romantic Jacuzzi UG10..."
                    required
                    className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
