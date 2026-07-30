import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Canvas } from "../layout/Canvas"
import { LivePreview } from './LivePreview';
import { PropertyPanel } from './PropertyPanel';
import { AddFieldMenu } from '@/components/fields/AddFieldMenu';
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight , Eye, Plus } from "lucide-react";
import { useUIStore } from '@/store/uiStore';

import { useTranslation } from 'react-i18next';



export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {previewOpen,setPreviewOpen} = useUIStore();
  
  const {t} = useTranslation();
  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar */}
      <Navbar
/>
       
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fields */}
   

        {/* Center Canvas */}
        <Canvas/>
        
         {/* Property Panel - Bottom Right */}
       <PropertyPanel /> 
        {/* Right Panel - Live Preview */}
            
         {previewOpen && (
        <LivePreview />
    )}


       
      </div>
  <AddFieldMenu/>
      {/* Floating Add Field Button */}
    
    </div>
  );
};