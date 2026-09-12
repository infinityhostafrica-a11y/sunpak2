import Link from 'next/link';
import { Logo } from '../logo';
import { MapPin, Phone, MessageCircle, ShieldCheck, Mail, ArrowUpRight, Clock, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Col 1: Brand & Office */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-2 rounded-2xl inline-block">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Simplifying and securing the journey to freehold land ownership in Kenya. We connect local and diaspora investors to verified, value-added parcels with ready title deeds.
            </p>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex gap-3">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Information House, 2nd Floor, Suite A4<br />
                  Mfangano Street Opposite Quickmart Supermarket,<br />
                  Nairobi CBD, Kenya.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2 text-sm">
                  <Link href="tel:0790011042" className="font-bold hover:text-amber-400 transition-colors">
                    0790 011 042 (Val)
                  </Link>
                  <span className="text-slate-500">/</span>
                  <Link href="tel:0790611601" className="font-bold hover:text-amber-400 transition-colors">
                    0790 611 601 (James)
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Daily Site Visits: Mon - Sun (9:00 AM Departure)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Corridors */}
          <div className="lg:col-span-3">
            <p className="font-bold text-white uppercase tracking-wider text-xs mb-5 text-amber-400">
              Prime Corridors
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/plots-for-sale?location=Kitengela" className="hover:text-amber-400 transition-colors flex items-center justify-between">Kitengela Plots <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
              <li><Link href="/plots-for-sale?location=Isinya" className="hover:text-amber-400 transition-colors flex items-center justify-between">Isinya Highway Plots <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
              <li><Link href="/plots-for-sale?location=Kisaju" className="hover:text-amber-400 transition-colors flex items-center justify-between">Kisaju Mooi Gardens <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
              <li><Link href="/plots-for-sale?location=Konza" className="hover:text-amber-400 transition-colors flex items-center justify-between">Konza Technopolis <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
              <li><Link href="/plots-for-sale?location=Juja" className="hover:text-amber-400 transition-colors flex items-center justify-between">Juja Farm Plots <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
              <li><Link href="/plots-for-sale?location=Mwea" className="hover:text-amber-400 transition-colors flex items-center justify-between">Mwea / Karaba Plots <ArrowUpRight className="h-3 w-3 opacity-60" /></Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2">
            <p className="font-bold text-white uppercase tracking-wider text-xs mb-5 text-amber-400">
              Company
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Sunpak</Link></li>
              <li><Link href="/testimonials" className="hover:text-amber-400 transition-colors">Testimonials</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-400 transition-colors">Site Visit Gallery</Link></li>
              <li><Link href="/blogs" className="hover:text-amber-400 transition-colors">Blogs & Insights</Link></li>
              <li><Link href="/info/faqs" className="hover:text-amber-400 transition-colors">Title Deed FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantee */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-bold text-white uppercase tracking-wider text-xs mb-4 text-amber-400">
              Security Guarantee
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <ShieldCheck className="h-4 w-4" /> 100% Due Diligence
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                All land is pre-searched, surveyed by licensed surveyors, beaconed, and sold with authentic freehold title deeds.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="https://wa.me/254790011042?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects."
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Val (0790 011 042)
              </Link>
              <Link
                href="https://wa.me/254790611601?text=Hello%20Sunpak%20Estate%2C%20I%20am%20interested%20in%20your%20land%20projects."
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-slate-700"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp James (0790 611 601)
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sunpak Estate Kenya. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-[11px] font-semibold uppercase tracking-wider">
            <span>Freehold Title Deeds</span>
            <span>Zero Interest Financing</span>
            <span>Information House Nairobi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
