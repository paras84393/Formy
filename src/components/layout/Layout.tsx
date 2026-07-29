import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { LivePreview } from './LivePreview';
import { PropertyPanel } from './PropertyPanel';
import { AddFieldMenu } from '@/components/fields/AddFieldMenu';
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight , Eye } from "lucide-react";
import { useUIStore } from '@/store/uiStore';
import { Button } from '../common/Button';
import { useTranslation } from 'react-i18next';



export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {previewOpen,setPreviewOpen} = useUIStore();
  const {t} = useTranslation();
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
       
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fields */}
      <motion.aside
      animate={{
        width: sidebarOpen ? 320 : 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="overflow-hidden border-r border-gray-100 bg-[#FCFCFD]"
    >
      <Sidebar />
    </motion.aside>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="
          z-50
          h-8
          w-8
          rounded-full
          bg-white
          border
          shadow-md
          flex
          items-center
          justify-center
          hover:bg-gray-100
          transition
          -ml-1
        "
      >
        {sidebarOpen ? (
          <ChevronLeft size={28}/>
        ) : (
          <ChevronRight size={28} />
        )}
      </button>


        {/* Center Canvas */}
        <Canvas />
        
         {/* Property Panel - Bottom Right */}
        <PropertyPanel />
        {/* Right Panel - Live Preview */}
            
         {previewOpen && (
        <LivePreview />
    )}

     {!previewOpen && (
    <Button 
        onClick={() => setPreviewOpen(true)}
        className='text-white font-bold mr-4 ml-2 mb-30'
    >
        {t("livePreview")}
    </Button>
)}
       
      </div>
  <AddFieldMenu/>
      {/* Floating Add Field Button */}
    
    </div>
  );
};