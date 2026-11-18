import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import {
  getFeaturedProducts,
} from "@/data/products";

import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover thoughtfully selected products, practical home essentials, useful gadgets, and everyday finds at My Useful Finds.",

  openGraph: {
    title: "My Useful Finds | Discover Things That Make Life Better",
    description:
      "Explore useful products, home essentials, and everyday discoveries worth sharing.",
    siteName: "My Useful Finds",
    locale: "en_PH",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "My Useful Finds",
    description:
      "Discover useful products, home essentials, and everyday finds.",
  },
};

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            A LITTLE SOMETHING FOR EVERYDAY LIVING
          </span>

          <h1>
            Discover things
            <br />
            that make life <em>better.</em>
          </h1>

          <p>
            Thoughtfully selected finds for your home, workspace,
            and all the little moments in between.
          </p>

          <a href="/all-finds" className="primary-button">
            EXPLORE THE FINDS
            <ArrowUpRight size={16} />
          </a>

          <div className="hero-note">
            <span className="hero-note-line" />
            USEFUL THINGS. BETTER LIVING.
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1500&q=90"
            alt="Warm, thoughtfully designed modern living space"
          />

          <div className="hero-image-caption">
            <span>THE ART OF EVERYDAY LIVING</span>
            <ArrowDownRight size={19} />
          </div>

          <div className="hero-index">COLLECTION NO. 001</div>
        </div>
      </div>
    </section>
  );
}

function FeaturedFinds({ products }: { products: Product[] }) {
  return (
    <section className="featured-section section-space" id="featured">
      <div className="container">
        <div className="section-top">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>

            <h2 className="section-heading">
              Featured discoveries.
            </h2>

            <p className="section-description">
              {`Showing ${products.length} featured product${products.length === 1 ? "" : "s"}.`}
            </p>
          </div>

          <a href="/all-finds" className="text-link desktop-link">
            VIEW ALL FINDS <ArrowUpRight size={15} />
          </a>
        </div>

        <ProductGrid
          products={products}
          emptyMessage="No featured finds available yet. Check back soon!"
        />

        <div className="featured-mobile-link">
          <a href="/all-finds" className="text-link">
            VIEW ALL FINDS <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-space" id="about">
      <div className="container about-inner">
        <div className="about-mark">M.</div>

        <div className="about-copy">
          <span className="eyebrow">A NOTE ABOUT US</span>

          <h2>
            Not everything needs to be extraordinary.
            <em> Sometimes, useful is enough.</em>
          </h2>

          <p>
            My Useful Finds is a curated collection of interesting
            products, practical discoveries, and everyday essentials.
            We believe the right little things can make everyday life
            more enjoyable.
          </p>

          <a href="#footer" className="text-link">
            GET TO KNOW US <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function DiscoveryBanner() {
  return (
    <section className="discovery-banner">
      <div className="container discovery-inner">
        <span className="eyebrow">
          ALWAYS SOMETHING WORTH DISCOVERING
        </span>

        <h2>Good finds are worth sharing.</h2>

        <p>
          Explore useful discoveries and find something that
          makes your everyday a little better.
        </p>

        <a href="/all-finds" className="primary-button">
          START EXPLORING <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" className="brand">
              my useful finds<span>.</span>
            </a>

            <p>Useful things. Better living.</p>
          </div>

          <div className="footer-column">
            <span className="eyebrow">EXPLORE</span>
            <a href="/all-finds">All Finds</a>
            <a href="/#about">About Us</a>
          </div>

          <div className="footer-column">
            <span className="eyebrow">INFORMATION</span>
            <a href="#affiliate-note">Affiliate Disclosure</a>
            <a href="mailto:hello@myusefulfinds.com">Contact</a>
          </div>

          <div className="footer-social">
            <span className="eyebrow">FOLLOW OUR FINDS</span>

            <a
              href="https://www.pinterest.com/myusefulfinds/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit My Useful Finds on Pinterest"
            >
              PINTEREST <ArrowUpRight size={14} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Instagram"
            >
              INSTAGRAM <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="affiliate-note" id="affiliate-note">
          <p>
            As an Amazon Associate I earn from qualifying purchases.
            Some links on this website may be affiliate links.
          </p>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MY USEFUL FINDS. ALL RIGHTS RESERVED.
          </span>

          <span>MADE WITH CARE.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <main>
        <Hero />
        <FeaturedFinds products={featuredProducts} />
        <AboutSection />
        <DiscoveryBanner />
      </main>

      <Footer />
    </>
  );
}
