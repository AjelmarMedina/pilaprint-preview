import { useNavigate } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoFull from "@/imports/primary.png";
import { B, ff, ffH } from "@/app/components/shared";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";

export function TermsPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#FEFDF8]" style={ff}>
      <Navbar />

      <main className="my-20 px-6 md:px-32">
        <h1 className="text-3xl font-bold text-center my-8" style={ffH}>
          Terms and Conditions
        </h1>
        <p>
          By accessing and using PILA PRINT, you agree to comply with the following terms and conditions:
        </p>
        <ul className="ml-6 list-disc list-outside mt-4 space-y-2">
          <li>
            Users must provide accurate and complete information when creating an account.
          </li>
          <li>
            Users are responsible for maintaining the confidentiality of their account credentials.
          </li>
          <li>
            Users are responsible for all content, files, and information submitted through the platform.
          </li>
          <li>
            Pila Print reserves the right to suspend or terminate accounts that violate applicable laws, regulations, or platform policies.
          </li>
          <li>
            Users agree not to use the platform for fraudulent, unlawful, or harmful activities.
          </li>
          <li>
            Pila Print may modify, update, or improve its services and features at any time without prior notice.
          </li>
          <li>
            While Pila Print strives to provide reliable service, the platform does not guarantee uninterrupted or error-free operation.
          </li>
          <li>
            By using the platform, users consent to the collection and processing of information in accordance with the Privacy Policy.
          </li>
          <li>
            Continued use of Pila Print constitutes acceptance of these Terms and Conditions.
          </li>
        </ul>
      </main>
      
      <Footer />
    </div>

  );
}