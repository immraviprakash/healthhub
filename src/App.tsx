import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wind,
  Stethoscope,
  Thermometer,
  Info,
  Baby,
  User,
  ChevronRight,
  Play,
  AlertCircle,
  Search,
  Menu,
  X,
  HeartPulse,
  Pill,
  Droplets
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserMode, Medication } from './types';

const medications: Medication[] = [
  {
    id: '1',
    name: 'Salbutamol (Inhaler)',
    purpose: 'Used for quick relief of asthma symptoms like wheezing and shortness of breath.',
    instructions: 'Shake well, breathe out, press canister while breathing in slowly, hold breath for 10 seconds.',
    safetyNotes: 'May cause rapid heartbeat or shakiness. Rinse mouth after use if it contains steroids.',
    videoUrl: 'https://www.youtube.com/embed/Rdb3s9j6vyw',
    thumbnail: '/images/salbutamol_thumbnail.png'
  },
  {
    id: '2',
    name: 'Paracetamol',
    purpose: 'Relieves pain and reduces fever.',
    instructions: 'Adults: 500mg-1g every 4-6 hours. Children: Dose based on weight/age as directed.',
    safetyNotes: 'Do not exceed 4g in 24 hours for adults. Can cause liver damage if overdosed.',
    videoUrl: 'https://www.youtube.com/embed/u_v95SjU6jI',
    thumbnail: '/images/paracetamol_thumbnail.png'
  },
  {
    id: '3',
    name: 'Cetirizine',
    purpose: 'Antihistamine used to treat hay fever and allergy symptoms.',
    instructions: 'Take one 10mg tablet daily. Can be taken with or without food.',
    safetyNotes: 'May cause drowsiness in some people. Avoid alcohol while taking.',
    videoUrl: 'https://www.youtube.com/embed/8-zY_G_Z6_k',
    thumbnail: '/images/cetirizine_thumbnail.png'
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
};

const floatIcon = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function App() {
  const [mode, setMode] = useState<UserMode>('adult');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMode = () => {
    setMode(prev => prev === 'adult' ? 'child' : 'adult');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${mode === 'child' ? 'child-friendly-gradient' : 'medical-gradient'}`}>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <HeartPulse className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-medical-dark">
              Health<span className="text-primary">Hub</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#lungs" className="text-sm font-medium hover:text-primary transition-colors">Lungs</a>
            <a href="#conditions" className="text-sm font-medium hover:text-primary transition-colors">Conditions</a>
            <a href="#ailments" className="text-sm font-medium hover:text-primary transition-colors">Ailments</a>
            <a href="#medications" className="text-sm font-medium hover:text-primary transition-colors">Medications</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMode}
              className={`rounded-full gap-2 transition-all ${mode === 'child' ? 'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200' : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'}`}
            >
              {mode === 'adult' ? <Baby className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span className="hidden sm:inline">{mode === 'adult' ? 'Switch to Child Mode' : 'Switch to Adult Mode'}</span>
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <a href="#lungs" onClick={() => setIsMenuOpen(false)}>How Lungs Work</a>
              <a href="#conditions" onClick={() => setIsMenuOpen(false)}>Asthma & COPD</a>
              <a href="#ailments" onClick={() => setIsMenuOpen(false)}>Fever & Cough</a>
              <a href="#medications" onClick={() => setIsMenuOpen(false)}>Medications</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12">
        <motion.section
          className="container mx-auto px-4 mb-16"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs uppercase tracking-wider font-semibold inline-block">
                  {mode === 'adult' ? 'Professional Health Education' : 'Fun Health Learning!'}
                </Badge>
                <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${mode === 'child' ? 'text-orange-600 font-serif' : 'text-medical-dark'}`}>
                  {mode === 'adult'
                    ? 'Your Trusted Partner in Respiratory Health'
                    : "Let's Learn How Our Bodies Work!"}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed block">
                  {mode === 'adult'
                    ? 'Providing evidence-based information on lung health, common ailments, and medication management to help you breathe easier.'
                    : 'Welcome to HealthHub! We have cool stories about your lungs, why we cough, and how medicine helps us feel better.'}
                </p>
              </motion.div>
            </AnimatePresence>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                  Explore Topics
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Symptom Guide
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <section id="lungs" className="container mx-auto px-4 mb-24 scroll-mt-24">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className={`p-8 rounded-3xl ${mode === 'child' ? 'bg-yellow-50 border-2 border-yellow-200' : 'glass-panel'}`}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={floatIcon} animate="animate" className={`p-3 rounded-2xl ${mode === 'child' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                  <Wind className={`w-8 h-8 ${mode === 'child' ? 'text-orange-600' : 'text-primary'}`} />
                </motion.div>
                <h2 className={`text-3xl font-bold ${mode === 'child' ? 'text-orange-700' : 'text-medical-dark'}`}>
                  How the Lungs Work
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {mode === 'adult' ? (
                    <>
                      <p className="text-muted-foreground">
                        The lungs are the center of the respiratory system. Their primary function is gas exchange: bringing oxygen into the body and removing carbon dioxide.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Wind className="w-4 h-4 text-primary" /> Inhalation
                          </h4>
                          <p className="text-sm text-muted-foreground">The diaphragm contracts, creating space for air to rush into the lungs through the trachea and bronchi.</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-primary" /> Gas Exchange
                          </h4>
                          <p className="text-sm text-muted-foreground">Occurs in the alveoli (tiny air sacs), where oxygen enters the blood and CO2 leaves it.</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-orange-900 font-medium">
                        Think of your lungs like two big balloons in your chest! 🎈🎈
                      </p>
                      <ul className="space-y-4">
                        <li className="flex gap-3">
                          <div className="bg-orange-200 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-orange-700 font-bold text-xs">1</div>
                          <p>When you breathe in, your "balloons" fill up with fresh air called Oxygen.</p>
                        </li>
                        <li className="flex gap-3">
                          <div className="bg-orange-200 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-orange-700 font-bold text-xs">2</div>
                          <p>The air goes down a tube called the windpipe, like a slide!</p>
                        </li>
                        <li className="flex gap-3">
                          <div className="bg-orange-200 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-orange-700 font-bold text-xs">3</div>
                          <p>Inside, there are tiny branches like a tree that help the air get into your blood.</p>
                        </li>
                      </ul>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div variants={fadeInUp} className="relative">
              <div className={`aspect-square rounded-full overflow-hidden border-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${mode === 'child' ? 'border-yellow-200' : 'border-white shadow-2xl'}`}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mode}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    src={mode === 'adult'
                      ? "/images/adult_lungs_v3.jpg"
                      : "/images/child_lungs_v2.jpg"}
                    alt="Lungs Diagram"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Fun Fact</p>
                  <p className="text-sm italic">
                    {mode === 'adult'
                      ? "Your lungs have a surface area roughly the size of a tennis court!"
                      : "You breathe about 20,000 times every single day! Wow!"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        <section id="conditions" className="bg-white/50 py-24 mb-24 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Asthma, COPD & Allergies</h2>
              <p className="text-muted-foreground">Understanding common respiratory conditions and how to manage them effectively.</p>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} className="h-full">
                <Card className="border-none glass-card overflow-hidden group h-full">
                  <div className="h-48 bg-blue-600 relative overflow-hidden">
                    <img src="/images/asthma_card.png" alt="Asthma" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wind className="w-16 h-16 text-white opacity-40" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Asthma</CardTitle>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">Common</Badge>
                    </div>
                    <CardDescription>A condition where airways narrow and swell.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="symptoms">
                        <AccordionTrigger>Symptoms</AccordionTrigger>
                        <AccordionContent>
                          Wheezing, shortness of breath, chest tightness, and coughing.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="management">
                        <AccordionTrigger>Management</AccordionTrigger>
                        <AccordionContent>
                          Using inhalers, avoiding triggers (smoke, dust), and having an action plan.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} className="h-full">
                <Card className="border-none glass-card overflow-hidden group h-full">
                  <div className="h-48 bg-teal-600 relative overflow-hidden">
                    <img src="/images/copd_card.png" alt="COPD" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AlertCircle className="w-16 h-16 text-white opacity-40" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>COPD</CardTitle>
                      <Badge variant="outline" className="text-teal-600 border-teal-200">Chronic</Badge>
                    </div>
                    <CardDescription>Chronic Obstructive Pulmonary Disease.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="difference">
                        <AccordionTrigger>Vs. Asthma</AccordionTrigger>
                        <AccordionContent>
                          COPD is usually progressive and permanent, often caused by smoking, whereas asthma is often reversible and triggered by allergies.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="care">
                        <AccordionTrigger>Care Tips</AccordionTrigger>
                        <AccordionContent>
                          Pulmonary rehabilitation, oxygen therapy, and smoking cessation are key.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} className="h-full">
                <Card className="border-none glass-card overflow-hidden group h-full">
                  <div className="h-48 bg-green-600 relative overflow-hidden">
                    <img src="/images/allergies_card.png" alt="Allergies" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Droplets className="w-16 h-16 text-white opacity-40" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>Allergies</CardTitle>
                      <Badge variant="outline" className="text-green-600 border-green-200">Seasonal</Badge>
                    </div>
                    <CardDescription>Immune system reaction to foreign substances.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="triggers">
                        <AccordionTrigger>Common Triggers</AccordionTrigger>
                        <AccordionContent>
                          Pollen, dust mites, pet dander, mold, and certain foods.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="prevention">
                        <AccordionTrigger>Prevention</AccordionTrigger>
                        <AccordionContent>
                          Keep windows closed during high pollen days, use air purifiers, and wash bedding frequently.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="ailments" className="container mx-auto px-4 mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="glass-panel bg-red-50/50 p-8 rounded-3xl border border-red-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <Thermometer className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-red-900">Fever Care</h3>
                </div>
                <Tabs defaultValue="adults" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="adults">Adults</TabsTrigger>
                    <TabsTrigger value="children">Children</TabsTrigger>
                  </TabsList>
                  <TabsContent value="adults" className="space-y-4">
                    <p className="text-sm font-medium text-red-800">When it&apos;s serious:</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-red-700">
                      <li>Temperature above 103°F (39.4°C)</li>
                      <li>Severe headache or stiff neck</li>
                      <li>Difficulty breathing or chest pain</li>
                    </ul>
                    <Separator className="bg-red-200" />
                    <p className="text-sm">Rest, stay hydrated, and use over-the-counter fever reducers if uncomfortable.</p>
                  </TabsContent>
                  <TabsContent value="children" className="space-y-4">
                    <p className="text-sm font-medium text-red-800">Special Care for Kids:</p>
                    <ul className="text-sm space-y-2 list-disc pl-4 text-red-700">
                      <li>Call doctor if baby under 3 months has any fever</li>
                      <li>Watch for lethargy or dehydration</li>
                      <li>Comfort is more important than the number on the thermometer</li>
                    </ul>
                    <Separator className="bg-red-200" />
                    <p className="text-sm">Use age-appropriate doses of children&apos;s paracetamol or ibuprofen.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="flex-1">
              <div className="glass-panel bg-blue-50/50 p-8 rounded-3xl border border-blue-100/50">
                <div className="flex items-center gap-3 mb-6">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-900">Cough Guide</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Dry</Badge>
                    <p className="text-sm">Tickly cough with no mucus. Often caused by allergies or cold.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Chesty</Badge>
                    <p className="text-sm">Produces mucus. Helps clear the lungs. Stay hydrated to thin mucus.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Whooping</Badge>
                    <p className="text-sm">Severe coughing fits followed by a "whoop" sound. Seek medical help.</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-xs text-muted-foreground italic">Remedies: Honey (for ages 1+), steam, and hydration are often more effective than cough syrups.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="medications" className="container mx-auto px-4 mb-24 scroll-mt-24">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Medication Safety</h2>
              <p className="text-muted-foreground">Learn about common medications and how to use them safely.</p>
            </div>
            <Pill className="w-12 h-12 text-primary opacity-20 hidden sm:block" />
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {medications.map((med) => (
              <motion.div key={med.id} variants={fadeInUp} whileHover={{ scale: 1.03 }}>
                <Card className="flex flex-col h-full border-none glass-card transition-transform">
                  <div className="relative group cursor-pointer">
                    <img src={med.thumbnail} alt={med.name} className="w-full aspect-video object-cover rounded-t-xl" referrerPolicy="no-referrer" loading="lazy" />
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                            <Play className="text-white fill-white w-8 h-8" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                        <DialogHeader className="p-4 bg-white">
                          <DialogTitle>{med.name} - How to Use</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video">
                          <iframe
                            width="100%"
                            height="100%"
                            src={med.videoUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{med.name}</CardTitle>
                    <CardDescription className="font-medium text-medical-dark">{med.purpose}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Instructions</h4>
                      <p className="text-sm">{med.instructions}</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Safety Note
                      </h4>
                      <p className="text-xs text-amber-900">{med.safetyNotes}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                      Read Full Leaflet <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="container mx-auto px-4 mb-24">
          <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Not feeling well?</h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Our quick guide can help you understand your symptoms and decide if you need to see a doctor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="rounded-full px-8 font-bold">
                  Start Symptom Guide
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/20 hover:bg-white/20 text-white">
                  Find a Pharmacy
                </Button>
              </div>
            </div>
            <Search className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <HeartPulse className="text-primary w-8 h-8" />
                <span className="text-2xl font-bold tracking-tight text-white">
                  Health<span className="text-primary">Hub</span>
                </span>
              </div>
              <p className="max-w-md mb-6">
                Your reliable source for respiratory health education and medication guidance. We empower patients with knowledge for better health outcomes.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Info className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Emergency</h4>
              <p className="text-sm mb-4">If you are experiencing a medical emergency, please call your local emergency services immediately.</p>
              <div className="bg-red-900/30 border border-red-900/50 p-4 rounded-xl">
                <p className="text-red-400 font-bold text-lg">Call 999 or 911</p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-500">
              © 2026 HealthHub Pharmacy & Education. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Disclaimer: This website provides educational information only and is not a substitute for professional medical advice.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
