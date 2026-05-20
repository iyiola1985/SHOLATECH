import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/data/config";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} - Home`}>
              <Image src={siteConfig.logo} alt={`${siteConfig.name} - ${siteConfig.tagline}`} width={240} height={100} className="h-12 w-auto object-contain sm:h-16 md:h-20" unoptimized />
            </Link>
            <p className="mt-3 type-subtitle text-slate-600">Websites, design, and digital solutions.</p>
          </div>
          <div>
            <h3 className="type-badge text-slate-500">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="type-subtitle text-slate-600 transition hover:text-slate-900">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="type-badge text-slate-500">Contact</h3>
            <ul className="mt-3 space-y-2 type-subtitle text-slate-600">
              <li><a href={`mailto:${siteConfig.email}`} className="hover:text-slate-900">{siteConfig.email}</a></li>
              <li><a href={`tel:${siteConfig.phoneTel}`} className="hover:text-slate-900">{siteConfig.phone}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="type-badge text-slate-500">Social</h3>
            <div className="mt-3 flex gap-4">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" /></svg>
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-8 text-center type-perk text-slate-500">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
