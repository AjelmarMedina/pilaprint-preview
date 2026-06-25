import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <ImageWithFallback src={logoFull} alt="PilaPrint" className="h-10 w-auto object-contain mb-4 brightness-0 invert" />
          <p className="text-gray-400 text-sm leading-relaxed" style={ff}>The campus printing platform for students in Dasmariñas, Cavite.</p>
        </div>
        {[
          { title: "Students", links: ["Sign Up","Browse Shops","Track Order","Wallet"] },
          { title: "Business", links: ["Partner with Us","Dashboard","Analytics","Support"] },
          { title: "Company",  links: ["About Us","Terms & Conditions","Privacy Policy","Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold mb-4" style={ffH}>{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a 
                    href={link === "Terms & Conditions" ? "/terms" : "#"}
                    className="text-gray-400 text-sm hover:text-white transition-colors" 
                    style={ff}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm" style={ff}>© 2026 PilaPrint. All rights reserved. Made with love for students in Dasmariñas, Cavite.</p>
      </div>
    </footer>
  );
}