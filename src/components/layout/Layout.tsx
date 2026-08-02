import React from 'react';
import { Navbar } from './Navbar';
import { Canvas } from "../layout/Canvas";
import { LivePreview } from './LivePreview';
import { PropertyPanel } from './PropertyPanel';
import { AddFieldMenu } from '@/components/fields/AddFieldMenu';
import { useUIStore } from '@/store/uiStore';

export const Layout: React.FC = () => {
  const { previewOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <Canvas />

        {/* Property Panel */}
        <PropertyPanel />

        {/* Live Preview - Opens only when previewOpen === true */}
        {previewOpen && <LivePreview />}
      </div>

      <AddFieldMenu />
    </div>
  );
};