import { create } from 'zustand';

interface UIStore {
  selectedFieldId: string | null;
  sidebarOpen: boolean;
  previewOpen: boolean;
  showAddFieldMenu: boolean;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning';
  

  setSelectedFieldId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  setPreviewOpen: (open: boolean) => void;
  
  setShowAddFieldMenu: (show: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
  
}

export const useUIStore = create<UIStore>((set) => ({
  selectedFieldId: null,
  sidebarOpen: true,
  previewOpen: false,
  showAddFieldMenu: false,
  toastMessage: null,
  toastType: 'info',

  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setPreviewOpen: (open) => set({ previewOpen: open }),
  setShowAddFieldMenu: (show) => set({ showAddFieldMenu: show }),
  showToast: (message, type = 'info') => set({ toastMessage: message, toastType: type }),
  hideToast: () => set({ toastMessage: null }),
}));