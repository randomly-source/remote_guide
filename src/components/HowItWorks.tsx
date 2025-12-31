import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { NanoMeterIcon, PowerSensorIcon, HubIcon, StreamingMeterIcon, RemoteIcon } from './icons/DeviceIcons';
import { motion } from 'framer-motion';
interface HowItWorksProps {
  onContinue: () => void;
}
export function HowItWorks({
  onContinue
}: HowItWorksProps) {
  const items = [{
    icon: <NanoMeterIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A90E2]" />,
    title: 'Nano Meter',
    desc: "Listens for special audio codes in TV programs to know what's playing."
  }, {
    icon: <PowerSensorIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A90E2]" />,
    title: 'Power Sensor',
    desc: 'Simply tells us if the TV is On or Off.'
  }, {
    icon: <RemoteIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A90E2]" />,
    title: 'People Remote',
    desc: 'You use this to tell us who in the family is watching.'
  }, {
    icon: <HubIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A90E2]" />,
    title: 'The Hub',
    desc: 'A backup cellular connection to send data if your WiFi goes down.'
  }, {
    icon: <StreamingMeterIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#4A90E2]" />,
    title: 'Streaming Meter',
    desc: 'Measures online content streamed to your TV.'
  }];
  return <div className="max-w-2xl md:max-w-full mx-auto pb-24">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2D3748] mb-2 sm:mb-3">
          How the magic happens
        </h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Understanding your equipment helps you set it up correctly.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {items.map((item, idx) => <motion.div key={item.title} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: idx * 0.1
      }}>
            <Card className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 p-2 bg-blue-50 rounded-xl">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#2D3748] text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Card>
          </motion.div>)}
      </div>

      <div className="fixed md:sticky bottom-0 left-0 right-0 px-4 pt-4 pb-8 pb-safe bg-white/90 backdrop-blur-md border-t border-gray-100 mt-auto">
        <div className="max-w-2xl md:max-w-full mx-auto">
          <Button onClick={onContinue} fullWidth className="min-h-[52px]">
            I understand, let's setup
          </Button>
        </div>
      </div>
    </div>;
}