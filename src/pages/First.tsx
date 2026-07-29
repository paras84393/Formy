import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Check,
  Zap,
  Eye,
  Palette,
  Share2,
  Smartphone,
  BarChart3,
  Layers,
  Cloud,
  Rocket,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/common/Button';
// ============================================================================
// NAVIGATION
// ============================================================================

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/1")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br bg-black flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">Formy</span>
        </motion.div>

        <div className="flex items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/1")}
            className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// SECTION 1 - HERO
// ============================================================================

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-24 pb-12 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Design beautiful forms in minutes.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                The fastest drag-and-drop form builder with live preview, customization, and effortless publishing.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/1")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                
                Create Form
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Play size={20} />
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Browser Frame */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-600">formy.app/builder</p>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="h-3 bg-gray-300 rounded w-24" />
                      <div className="h-10 bg-gray-100 rounded" />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <div className="h-10 bg-blue-600 rounded w-full" />
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-2xl opacity-40"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-100 rounded-2xl opacity-40"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 2 - TRUST
// ============================================================================

const TrustSection: React.FC = () => {
  const companies = ['Google', 'Microsoft', 'Slack', 'Figma', 'Stripe'];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600 font-medium mb-8">
          Trusted by students, startups, freelancers and businesses
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 3 - BUILD FORMS
// ============================================================================

const BuildFormsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Build forms visually.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Drag and drop components to build your form exactly as you imagine it. No coding required, just pure visual editing.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                'Drag & drop components',
                'Real-time preview',
                'Instant customization',
                'Auto-save functionality',
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <Check size={20} className="text-blue-600 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Video/Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-64 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  <Play size={48} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Demo video</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 4 - LIVE PREVIEW
// ============================================================================

const LivePreviewSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >
                    <div className="h-2 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-100 rounded mt-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                See changes instantly.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every modification updates the preview in real time. Build with confidence knowing exactly how your form looks to users.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'Instant preview updates',
                'Live field validation',
                'Real-time styling changes',
                'Immediate feedback',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <Eye size={20} className="text-blue-600 flex-shrink-0" />
                  {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 5 - CUSTOMIZATION
// ============================================================================

const CustomizationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Theme', icon: Palette },
    { label: 'Layout', icon: Layers },
    { label: 'Branding', icon: Zap },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Customize every detail.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Change themes, upload logos, adjust colors, and more. Every customization updates live.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === i
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Preview */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>

            <div className="p-12 bg-gradient-to-br from-gray-50 to-white">
              <div className="space-y-4">
                <div className="h-3 bg-gray-300 rounded w-32" />
                <div className="h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded" />
                <div className="h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 6 - FORM TYPES
// ============================================================================

const FormTypesSection: React.FC = () => {
  const formTypes = [
    { title: 'Feedback Form', icon: '💬' },
    { title: 'Survey', icon: '📊' },
    { title: 'Job Application', icon: '💼' },
    { title: 'Registration', icon: '📝' },
    { title: 'Quiz', icon: '🎯' },
    { title: 'Contact Form', icon: '📧' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start with templates.
          </h2>
          <p className="text-lg text-gray-600">
            Choose from dozens of pre-built templates or start from scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formTypes.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="font-semibold text-gray-900">{type.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Start with this template and customize
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 7 - FEATURES
// ============================================================================

const FeaturesSection: React.FC = () => {
  const features = [
    { title: 'Drag & Drop', icon: Layers, description: 'Build visually without code' },
    { title: 'Live Preview', icon: Eye, description: 'See changes instantly' },
    { title: 'Auto Save', icon: Cloud, description: 'Never lose your work' },
    { title: 'Responsive', icon: Smartphone, description: 'Perfect on any device' },
    { title: 'Analytics', icon: BarChart3, description: 'Track form submissions' },
    { title: 'Share', icon: Share2, description: 'Publish with one click' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need.
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed for modern form building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-all"
              >
                <div className="p-3 w-fit bg-blue-100 rounded-lg">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 8 - HOW IT WORKS
// ============================================================================

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      title: 'Create',
      description: 'Start a new form or choose a template',
      icon: '✨',
    },
    {
      title: 'Customize',
      description: 'Add fields, change colors, upload branding',
      icon: '🎨',
    },
    {
      title: 'Publish',
      description: 'Share your form with one click',
      icon: '🚀',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it works.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="hidden md:block absolute top-16 -right-4 text-gray-300"
                >
                  <ChevronRight size={32} />
                </motion.div>
              )}

              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="mb-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mx-auto">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 9 - RESPONSIVE
// ============================================================================

const ResponsiveSection: React.FC = () => {
  const devices = [
    { name: 'Desktop', width: 'w-64', icon: '🖥️' },
    { name: 'Tablet', width: 'w-48', icon: '📱' },
    { name: 'Mobile', width: 'w-32', icon: '📲' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Works everywhere.
          </h2>
          <p className="text-lg text-gray-600">
            Your forms look perfect on desktop, tablet, and mobile.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {devices.map((device, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className={`${device.width} mx-auto mb-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4`}>
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Form preview</p>
                </div>
              </div>
              <div className="text-2xl mb-2">{device.icon}</div>
              <p className="font-semibold text-gray-900">{device.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 10 - TESTIMONIALS
// ============================================================================

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: 'Formy made it incredibly easy to create a professional survey in minutes.',
      author: 'Sarah Chen',
      role: 'Product Manager',
      avatar: '👩‍💼',
    },
    {
      quote: 'The drag-and-drop interface is so intuitive. My team loves it.',
      author: 'Michael Rodriguez',
      role: 'Startup Founder',
      avatar: '👨‍💻',
    },
    {
      quote: 'Best form builder we\'ve used. Fast, reliable, and beautiful.',
      author: 'Emma Williams',
      role: 'UX Designer',
      avatar: '👩‍🎨',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Loved by builders.
          </h2>
          <p className="text-lg text-gray-600">
            See what people are saying about Formy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION 11 - FINAL CTA
// ============================================================================

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-white border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-5xl font-bold text-gray-900">
            Ready to build your next form?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of creators building beautiful forms today.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/1")}
          className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg"
        >
          <Rocket size={24} />
          Create Form Now
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm"
        >
          No credit card required. Start free today.
        </motion.p>
      </div>
    </motion.section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-lg font-semibold text-white">Formy</span>
            </div>
            <p className="text-sm">The fastest form builder for modern creators.</p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <p className="font-semibold text-white">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="font-semibold text-white">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="font-semibold text-white">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">© 2024 Formy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

// ============================================================================
// MAIN LANDING PAGE
// ============================================================================

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <TrustSection />
      <BuildFormsSection />
      <LivePreviewSection />
      <CustomizationSection />
      <FormTypesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ResponsiveSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />

      {/* Scroll-to-top Button */}
      <ScrollToTopButton />
    </div>
  );
};

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <ArrowRight size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;