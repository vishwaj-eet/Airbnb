import React from 'react';
import { BedDouble, Armchair } from 'lucide-react';
import { ListingData } from '../types';

interface SleepArrangementProps {
  arrangements: ListingData['sleepingArrangements'];
}

export const SleepArrangement: React.FC<SleepArrangementProps> = ({ arrangements }) => {
  return (
    <div className="py-8 border-b border-gray-200">
      <h3 className="text-xl sm:text-[22px] font-semibold text-gray-900 mb-5">
        Where you'll sleep
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-2xl p-5 hover:border-gray-400 transition-colors shadow-sm group"
          >
            <div className="rounded-xl overflow-hidden h-36 mb-4 bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-2 mb-2 text-gray-800">
              {item.iconName === 'BedDouble' ? (
                <BedDouble className="w-5 h-5 stroke-[1.75]" />
              ) : (
                <Armchair className="w-5 h-5 stroke-[1.75]" />
              )}
              <h4 className="font-semibold text-base text-gray-900">{item.title}</h4>
            </div>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
