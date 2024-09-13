import { ShieldIcon, RefreshCwIcon, ImportIcon } from "lucide-react";
import Link from "next/link";
import FeatureCard from "./featureCard";
import Fingerprint from "./fingerprint";
import EncryptionMethods from "./encryptionMethods";
export default function Hero() {
  return (
    <div className=" text-white">
      <main className="container mx-auto px-6 py-12">
        <section className="flex flex-col md:flex-row justify-around items-center mb-20">
          <section className="mb-8 md:mb-0">
            <Fingerprint />
          </section>
          <section className="text-center mb-16 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Secure Your Digital Life
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Manage all your passwords in one secure vault.
            </p>
            <Link
              href="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md text-lg transition"
            >
              Get Started
            </Link>
          </section>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldIcon className="h-12 w-12 text-indigo-400" />}
            title="Bank-Level Encryption"
            description="Your passwords are protected with AES-256 encryption, the same standard used by banks and governments."
          />
          <FeatureCard
            icon={<RefreshCwIcon className="h-12 w-12 text-indigo-400" />}
            title="Password Generator"
            description="Create strong, unique passwords for all your accounts with our built-in password generator."
          />
          <FeatureCard
            icon={<ImportIcon className="h-12 w-12 text-indigo-400" />}
            title="Easy Import"
            description="Seamlessly import passwords from your browser or other password managers."
          />
        </section>
        <section>
          <EncryptionMethods />
        </section>
      </main>
    </div>
  );
}
