'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

/* ============================================
   FOOTER COMPONENT
   Phase 1: Layout Components
   ============================================ */

const footerLinks = {
  unternehmen: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Karriere', href: '/karriere' },
    { label: 'Presse', href: '/presse' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  service: [
    { label: 'Verkaufen', href: '/verkaufen' },
    { label: 'So funktioniert\'s', href: '/#wie-es-funktioniert' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Versand', href: '/versand' },
  ],
  kategorien: [
    { label: 'Smartphones', href: '/verkaufen?kategorie=smartphone' },
    { label: 'Tablets', href: '/verkaufen?kategorie=tablet' },
    { label: 'Laptops', href: '/verkaufen?kategorie=laptop' },
    { label: 'Smartwatches', href: '/verkaufen?kategorie=smartwatch' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
    { label: 'Widerrufsrecht', href: '/widerruf' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🏔️</span>
              <span className="text-2xl font-bold">
                Bayern<span className="text-accent">Ankauf</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Ihr vertrauenswürdiger Partner für den Ankauf gebrauchter
              Elektronik in Bayern. Fair, schnell und sicher.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@bayernankauf.de"
                className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@bayernankauf.de
              </a>
              <a
                href="tel:+498912345678"
                className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                +49 89 123 456 78
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                München, Bayern
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="font-semibold text-white mb-4">Unternehmen</h4>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-semibold text-white mb-4">Service</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategorien */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kategorien</h4>
            <ul className="space-y-3">
              {footerLinks.kategorien.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h4 className="font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} BayernAnkauf. Alle Rechte vorbehalten.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="w-2 h-2 bg-success rounded-full" />
                SSL verschlüsselt
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="w-2 h-2 bg-success rounded-full" />
                DSGVO konform
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                🏔️ Made in Bavaria
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
