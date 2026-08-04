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


// ============================================================================
// NAVIGATION - MINIMAL & CLEAN
// ============================================================================

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/1")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-lg font-bold text-gray-900">formy</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Product
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Templates
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
            Features
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/1")}
          className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Create Form
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// HERO SECTION - WITH 3 CUSTOM IMAGES AS STICKERS
// ============================================================================

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* STICKER 1 - LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 0.8 }}
          animate={{ y: [0, -8, 0] }}
          whileHover={{ scale: 1.05, rotate: -5 }}
          className="absolute -left-12 top-20 w-32 h-32 lg:w-40 lg:h-40 hidden lg:block"
        >
          <img
            src="/images/form image1.jpg"
            alt="Decorative sticker"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* STICKER 2 - RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          animate={{ y: [0, 10, 0] }}
          whileHover={{ scale: 1.05, rotate: 10 }}
          className="absolute -right-16 top-32 w-36 h-36 lg:w-48 lg:h-48 hidden lg:block"
        >
          <img
            src="/images/form image2.jpg"
            alt="Decorative sticker"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* HERO CONTENT - CENTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 relative z-10"
        >
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight">
              Forms that
              <br />
              <span className="relative">
                feel like you
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{ originX: 0 }}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create beautiful forms, surveys and applications with a simple drag-and-drop builder.
              Customize everything and publish in minutes.
            </p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/1")}
              className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md text-lg"
            >
              Create a form
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-all text-lg flex items-center justify-center gap-2"
            >
              <Play size={20} />
              See how it works
            </motion.button>
          </motion.div>

          {/* ANNOTATION */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-4 text-sm text-gray-500 italic"
          >
            No credit card required
          </motion.div>
        </motion.div>

        {/* STICKER 3 - BOTTOM CENTER (OVERLAPPING) */}
        
      </div>
    </motion.section>
  );
};

// ============================================================================
// PRODUCT SHOWCASE - LARGE VISUAL
// ============================================================================

const ProductShowcaseSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">
            Your builder, visualized
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intuitive interface. Powerful features. Zero friction.
          </p>
        </motion.div>

        {/* PRODUCT MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-xs text-gray-600 ml-4">formy.app/builder</p>
            </div>


            {/* Content - 3 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
              {/* LEFT: SIDEBAR */}
              <div className="border-r border-gray-200 p-6 bg-gray-50">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-gray-600 mb-4">COMPONENTS</div>
                  {['Text', 'Email', 'Multiple Choice', 'Rating', 'File Upload'].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-3 bg-white rounded-lg border border-gray-200 cursor-grab hover:shadow-sm transition-all text-sm text-gray-700 font-medium"
                    >
                      + {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CENTER: CANVAS */}
              <div className="p-8 border-r border-gray-200 bg-white">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-32" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-gray-100 rounded" />
                  <div className="h-12 bg-black rounded" />
                </div>

                {/* ANNOTATION */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -left-12 top-1/3 text-xs text-gray-600 font-medium italic"
                >
                  
                </motion.div>
              </div>

              {/* RIGHT: PROPERTIES */}
              <div className="p-6 bg-gray-50">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-gray-600 mb-4">PROPERTIES</div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-300 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-2 bg-gray-300 rounded w-20 mt-4" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                </div>

                {/* ANNOTATION */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-20 top-1/4 text-xs text-gray-600 font-medium italic"
                >
                  
                </motion.div>
              </div>
            </div>
          </div>

          {/* FLOATING ANNOTATION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 italic"
          >
            looks good already
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION: BUILD LIKE WRITING A DOCUMENT
// ============================================================================

const BuildLikeWritingSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">
            Building a form
            <br />
            should feel this easy.
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Simply add questions, rearrange fields with drag-and-drop, and customize colors and branding.
            Watch your form come to life in real-time as you build.
          </p>

          {/* VISUAL STEPS - FLOATING ELEMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { label: 'Add Field', icon: '+', desc: 'Click or drag components' },
              { label: 'Drag & Drop', icon: '↔', desc: 'Rearrange instantly' },
              { label: 'Live Preview', icon: '👁', desc: 'See it all in real-time' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-6xl font-black text-gray-200">{step.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">{step.label}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION: FEATURE STORYTELLING (EDITORIAL LAYOUT)
// ============================================================================

const FeatureStorytellingSection: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'Build visually.',
      description:
        'Drag and drop your way to beautiful forms. No code, no complexity. Just pure visual editing that works the way you think.',
      side: 'left',
    },
    {
      number: '02',
      title: 'Make it yours.',
      description:
        'Upload your logo, choose your colors, set your fonts. Every detail can be customized to match your brand perfectly.',
      side: 'right',
    },
    {
      number: '03',
      title: 'See everything instantly.',
      description:
        'Every change appears in the live preview immediately. No waiting, no confusion. What you see is what your users get.',
      side: 'left',
    },
    {
      number: '04',
      title: 'Share anywhere.',
      description:
        'Get a unique link, embed your form, or integrate with your favorite tools. Publish in seconds, collect responses forever.',
      side: 'right',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto space-y-32">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              feature.side === 'right' ? 'md:grid-cols-2' : ''
            }`}
          >
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: feature.side === 'left' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={feature.side === 'right' ? 'md:order-2' : ''}
            >
              <div className="text-7xl md:text-8xl font-black text-gray-200 mb-6">
                {feature.number}
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </motion.div>

            {/* VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={feature.side === 'right' ? 'md:order-1' : ''}
            >
              <div className=" bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center">
                <div className="text-6xl text-gray-800">
                   {i === 0 && (
    <video
      src="/images/ui.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-contain drop-shadow-lg"
    />
  )}
                  {i === 1 && <img src='images/custom.jpg'/>}
                  {i === 2 && <img src='images/live.png'/>}
                  {i === 3 && <img src='images/share.png'/>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION: FORM EXAMPLES GALLERY (SCATTERED)
// ============================================================================

const FormExamplesSection: React.FC = () => {
  const forms = [
    'Job Application',
    'Event Registration',
    'Customer Feedback',
    'Contact Form',
    'Quiz',
    'Survey',
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-gray-900">
            Forms for everything.
          </h2>
          <p className="text-lg text-gray-600">
            Start with a template or build from scratch.
          </p>
        </motion.div>

        {/* SCATTERED GALLERY */}
        <div className="relative h-96 md:h-[500px]">
          {forms.map((form, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: (i % 3) * 5 - 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: (i % 3) * 3 - 3 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="absolute w-40 h-48 bg-white rounded-xl border-2 border-gray-300 p-4 cursor-pointer hover:shadow-lg transition-all"
              style={{
                left: `${(i % 3) * 35}%`,
                top: `${Math.floor(i / 3) * 50}%`,
                transform: `rotate(${(i % 3) * 3 - 3}deg)`,
              }}
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-3">
                  {i === 0}
                  {i === 1}
                  {i === 2}
                  {i === 3}
                  {i === 4}
                  {i === 5 }
                </div>
                <p className="font-bold text-gray-900 text-sm">{form}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================================================
// SECTION: FINAL CTA - WHITESPACE HEAVY
// ============================================================================

const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight">
            Your next form could be
            <br />
            live in minutes.
          </h2>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/1")}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-lg"
        >
          Start building
          <ArrowRight size={24} />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-sm"
        >
          No credit card required. Free forever.
        </motion.p>
      </div>
    </motion.section>
  );
};

// ============================================================================
// FOOTER - SIMPLE & EDITORIAL
// ============================================================================

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white border-t border-gray-200 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Formy</span>
            </div>
            <p className="text-sm text-gray-600">Forms made simple.</p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <p className="font-bold text-gray-900 text-sm">Product</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="font-bold text-gray-900 text-sm">Company</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="font-bold text-gray-900 text-sm">Legal</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>© 2024 Formy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              GitHub
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
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
          className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
        >
          <ArrowRight size={20} className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// MAIN LANDING PAGE
// ============================================================================

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProductShowcaseSection />
      <BuildLikeWritingSection />
      <FeatureStorytellingSection />
      <FormExamplesSection />
      <FinalCTASection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;